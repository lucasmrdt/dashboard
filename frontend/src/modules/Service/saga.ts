import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_SERVICES,
  getServicesSuccess,
  getServicesFailure,
  AUTH_SERVICE,
  authServiceSuccess,
  authServiceFailure,
} from './actions';
import * as servicesApi from './api';

import { Action } from 'types/Redux';
import { Service } from './types';

function* onGetServices() {
  try {
    const { success, data } = yield call(servicesApi.getServices);
    if (!success) {
      throw new Error(data);
    }

    const { services }: { services: Service[] } = data;

    yield put(getServicesSuccess(services));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(getServicesFailure(e.message));
  }
}

function* onAuthService(action: Action) {
  const { serviceName, token } = action.payload;

  try {
    const { success, data } = yield call(servicesApi.authService, serviceName, token);
    if (!success) {
      throw new Error(data);
    }

    yield put(authServiceSuccess(serviceName));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(authServiceFailure(e.message));
  }
}

export default function*() {
  yield takeLatest(GET_SERVICES, onGetServices);
  yield takeLatest(AUTH_SERVICE, onAuthService);
}
