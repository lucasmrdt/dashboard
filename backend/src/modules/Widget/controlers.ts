import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import config from 'config';
import { WidgetModel } from './model';
import { ServiceModel } from 'modules/Service/model';

import { User } from 'modules/User/types';

export const getWidgets = async (user: User) =>
  WidgetModel.find({ user }).exec();

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
    console.log(widget);
    return await WidgetModel.create({
      name: widget.name,
      description: widget.description,
      user,
      service
    });
  } catch (e) {
    throw createError(httpStatus.CONFLICT, {
      public: `fail to create widget ${widget.name}`,
      internal: `create widget [${widget.name}]: ${e.message}`
    });
  }
};

export const unsubscribeToWidget = async (widgetId: string) => {
  WidgetModel.remove({ _id: widgetId }).exec();
};

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
    return widgetConfig.getter(service.token, widget.params);
  } catch (e) {
    throw createError(httpStatus.SERVICE_UNAVAILABLE, {
      public: 'widget seems to be not avaibles',
      internal: `widget [${widget.name}]: ${e.message}`
    });
  }
};
