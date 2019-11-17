import config from 'src/config';
import app from 'src/app';
import { openMongoose, closeMongoose } from '@/Mongoose'; // should be your first require

export const setupServer = async () => {
  await openMongoose();

  const server = app.listen(config.express.port, () => {
    console.log(`Your api is running on port ${config.express.port} 🎉`);
  });
  server.on('close', closeMongoose);
};
