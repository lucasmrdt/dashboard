import { ServiceModel } from 'modules/Service/model';

const cleanServices = async () => {
  await ServiceModel.deleteMany({}).exec();

  console.log('services are now removed ✅');
};

export const clean = async () => {
  await cleanServices();
};
