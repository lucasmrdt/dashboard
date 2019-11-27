import _ from 'lodash';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { ServiceModel } from './model';

export const getServices = async () => {
  const services = await ServiceModel.find({}).exec();
  return services.map(service => ({
    ..._.omit(service.toJSON(), ['token']),
    locked: !service.token && service.needAuth
  }));
};

export const setTokenToService = async (serviceName: string, token: string) => {
  const service = await ServiceModel.findOne({ name: serviceName }).exec();
  if (!service) {
    throw createError(
      httpStatus.NOT_FOUND,
      `unfound service with name ${serviceName}`
    );
  }

  service.token = token;
  await service.save();
};
