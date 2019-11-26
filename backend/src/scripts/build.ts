import config from 'config';
import { ServiceModel } from 'modules/Service/model';

const buildServices = async () => {
  const services = await ServiceModel.find({}).exec();
  if (services.length) {
    console.warn(
      `Found '${services.length}' services, drop database to rebuild.`
    );
    return;
  }

  const servicePromises = config.services.map(async service => {
    const widgets = service.widgets.map(widget => ({
      name: widget.name,
      description: widget.description,
      defaultParams: widget.defaultParams,
      icon: widget.icon
    }));

    return ServiceModel.create({
      name: service.name,
      icon: service.icon,
      token: service.token,
      needAuth: service.needAuth,
      widgets
    });
  });

  await Promise.all(servicePromises);
};

export const build = async () => {
  await buildServices();
};
