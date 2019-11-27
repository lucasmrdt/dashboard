/* eslint-env node, mocha */

import assert from 'assert';
import httpStatus from 'http-status-codes';
import { UserModel } from 'modules/User/model';

import { SuperTest, Test } from 'supertest';

export const testUser = (getAgent: () => SuperTest<Test>) =>
  describe('User', () => {
    before(async () => {
      await UserModel.deleteMany({});
    });

    let token: string;

    describe('🔼 /user (creating account)', () => {
      it('should failed to create user (no payload)', async () => {
        await getAgent()
          .post('/user/credential')
          .expect(httpStatus.BAD_REQUEST)
          .expect(({ body }) => {
            assert(body.success === false);
            assert(typeof body.data === 'string');
          });
      });

      it('should create user', async () => {
        await getAgent()
          .post('/user/credential')
          .send({
            email: 'lucas.marandat@epitech.eu',
            name: 'lucas-test',
            password: 'test'
          })
          .expect(httpStatus.OK)
          .expect(({ body }) => {
            assert(body.success === true);
            const { jwtToken } = body.data;
            assert(typeof jwtToken === 'string');
            token = jwtToken;
          });
      });

      it('should failed to create user (duplicated user)', async () => {
        await getAgent()
          .post('/user/credential')
          .send({
            email: 'lucas.marandat@epitech.eu',
            name: 'lucas-test',
            password: 'test'
          })
          .expect(httpStatus.FORBIDDEN)
          .expect(({ body }) => {
            assert(body.success === false);
            assert(typeof body.data === 'string');
          });
      });
    });

    describe('🔽 /user/me (getting my informations)', () => {
      it('should get my informations', async () => {
        await getAgent()
          .get(`/user/me`)
          .set('Authorization', `${token}`)
          .expect(httpStatus.OK)
          .expect(({ body }) => {
            assert(body.success === true);
            const user = body.data;
            assert(typeof user.name === 'string');
            assert(typeof user.email === 'string');
          });
      });
    });
  });
