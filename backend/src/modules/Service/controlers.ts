import { ServiceModel } from './model';

export const getServices = async () => {
  const services = await ServiceModel.find({}, { token: false }).exec();
  return services.map(service => service.toJSON());
};
