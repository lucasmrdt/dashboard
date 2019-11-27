import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import config from 'config';
import { WidgetModel } from './model';
import { DEFAULT_REFRESH_INTERVAL } from './constants';
import { ServiceModel } from 'modules/Service/model';

import { User } from 'modules/User/types';

export const getWidgets = async (user: User) => {
  const widgets = await WidgetModel.find({ user }).exec();
  return widgets.map(widget => widget.toJSON());
};

export const subscribeToWidget = async (
  user: User,
  serviceName: string,
  widgetName: string
) => {
  const service = await ServiceModel.findOne({ name: serviceName }).exec();
  if (!service) {
    throw createError(
      httpStatus.NOT_FOUND,
      `unfound service with name ${serviceName}`
    );
  }

  const widget = service.widgets.find(({ name }) => name === widgetName);
  if (!widget) {
    throw createError(
      httpStatus.NOT_FOUND,
      `unfound widget with name ${serviceName}`
    );
  }

  try {
    const createdWidget = await WidgetModel.create({
      name: widget.name,
      description: widget.description,
      icon: widget.icon,
      params: {
        refreshInterval: DEFAULT_REFRESH_INTERVAL,
        ...widget.defaultParams
      },
      user,
      service
    });
    return createdWidget.toJSON();
  } catch (e) {
    throw createError(httpStatus.CONFLICT, {
      public: `fail to create widget ${widget.name}`,
      internal: `create widget [${widget.name}]: ${e.message}`
    });
  }
};

export const unsubscribeToWidget = async (widgetId: string) =>
  WidgetModel.deleteOne({ _id: widgetId }).exec();

export const getWidgetData = async (widgetId: string) => {
  const widget = await WidgetModel.findOne({ _id: widgetId })
    .populate('service')
    .exec();
  if (!widget) {
    throw createError(
      httpStatus.FORBIDDEN,
      `no widget with id ${widgetId} avaible for user`
    );
  }

  const { service } = widget;

  const serviceConfig = config.services.find(
    ({ name }) => name === service.name
  );
  if (!serviceConfig) {
    throw createError(
      httpStatus.NOT_IMPLEMENTED,
      `service with name ${service.name} is not yet implemented`
    );
  }

  const widgetConfig = serviceConfig.widgets.find(
    ({ name }) => name === widget.name
  );
  if (!widgetConfig) {
    throw createError(
      httpStatus.NOT_IMPLEMENTED,
      `widget with name ${widget.name} is not yet implemented`
    );
  }

  try {
    return await widgetConfig.getter(service.token, widget.params);
  } catch (e) {
    throw createError(httpStatus.SERVICE_UNAVAILABLE, {
      public: 'widget seems to be not avaibles',
      internal: `widget [${widget.name}]: ${e.message}`
    });
  }
};

export const updateWidgetParams = async (
  widgetId: string,
  params: { [key: string]: any }
) => {
  const widget = await WidgetModel.findOne({ _id: widgetId }).exec();
  if (!widget) {
    throw createError(
      httpStatus.FORBIDDEN,
      `no widget with id ${widgetId} avaible for user`
    );
  }

  widget.params = { ...widget.params, ...params };
  try {
    await widget.save();
  } catch (e) {
    throw createError(httpStatus.BAD_REQUEST, {
      public: 'fail to update widget params',
      internal: `widget [${widget.name}]: ${e.message}`
    });
  }

  return widget.params;
};
