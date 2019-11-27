/* eslint-env node, mocha */
/* eslint import/first: off */

process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from 'src/app';
import { openMongoose, closeMongoose } from 'modules/Mongoose';
import { testUser } from './user-tests';
import { testService } from './service-tests';

import { SuperTest, Test } from 'supertest';

let agent: SuperTest<Test>;

const getAgent = () => agent;

describe('Supertest', () => {
  before(async () => {
    agent = request.agent(app);
    await openMongoose();
  });

  after(async () => {
    await closeMongoose();
  });

  testUser(getAgent);
  testService(getAgent);
});
