/* eslint-env node, mocha */

import assert from 'assert';
import httpStatus from 'http-status-codes';
import { UserModel } from 'modules/User/model';

import { IUser } from 'modules/User/types';
import { SuperTest, Test } from 'supertest';

export const testService = (getAgent: () => SuperTest<Test>) =>
  describe('Service', () => {
    let user: IUser;

    before(async () => {
      user = (await UserModel.findOne({})) as IUser;
    });

    describe('⬇️ /service (get services)', () => {
      it('should fail to get services (no auth)', async () => {
        await getAgent()
          .get('/service')
          .expect(httpStatus.FORBIDDEN)
          .expect(({ body }) => {
            assert(body.success === false);
            assert(typeof body.data === 'string');
          });
      });

      it('should get services (with auth)', async () => {
        await getAgent()
          .get('/service')
          .set('Authorization', `${user.jwtToken}`)
          .expect(httpStatus.OK)
          .expect(({ body }) => {
            assert(body.success === true);
            assert(typeof body.data === 'object');
          });
      });
    });
  });
