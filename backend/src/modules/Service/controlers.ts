import { ServiceModel } from './model';

export const getServices = async () =>
  ServiceModel.find({}, { token: false }).exec();
