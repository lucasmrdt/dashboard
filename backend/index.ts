/* eslint-disable import/first */
if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import 'colors';
import { setupServer } from 'src/server';

const onError = (e: Error | any) => {
  console.error(`[build-error] ${e.message.bold.red}`);
  throw e;
};

async function main() {
  try {
    await setupServer();
  } catch (e) {
    onError(e);
  }
}

process.on('unhandledRejection', onError);
process.on('uncaughtException', onError);

main();
