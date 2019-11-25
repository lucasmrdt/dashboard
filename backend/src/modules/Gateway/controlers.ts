import config from 'config';

export const getServerInformation = (userIp: string) => ({
  client: {
    host: userIp
  },
  server: {
    current_time: Date.now(),
    services: config.services.map(service => ({
      name: service.name,
      widgets: service.widgets.map(widget => ({
        name: widget.name,
        description: widget.description,
        params: widget.params
      }))
    }))
  }
});
