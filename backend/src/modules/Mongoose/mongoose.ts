import mongoose from 'mongoose';
import config from 'config';

export const openMongoose = async () => {
  const {MONGODB_LOGIN, MONGODB_PASSWORD} = config.env;
  const {uri} = config.mongoose;

  const options = {
    useNewUrlParser: true,
    user: MONGODB_LOGIN,
    pass: MONGODB_PASSWORD,
  };

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  try {
    await mongoose.connect(uri, options);
  } catch (e) {
    throw new Error(`mongoose connection: ${e.message}.`);
  }
};

export const closeMongoose = () => mongoose.disconnect();
