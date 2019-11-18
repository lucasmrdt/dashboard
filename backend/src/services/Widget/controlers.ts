import config from 'config';

export const getServerInformation = (userIp: string) => ({
  client: {
    host: userIp,
  },
  server: {
    current_time: Date.now(),
    services: config.sevices,
  },
});
