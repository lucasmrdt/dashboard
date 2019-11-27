import config from 'src/config';
import app from 'src/app';
import { openMongoose, closeMongoose } from 'modules/Mongoose'; // should be your first require
import { build } from 'src/scripts';

export const setupServer = async () => {
  await openMongoose();
  await build();

  const server = app.listen(config.express.port, () => {
    console.log(`Your api is running on port ${config.express.port} 🎉`);
  });
  server.on('close', closeMongoose);
};
