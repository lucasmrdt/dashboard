import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_SERVICES, getServicesSuccess, getServicesFailure } from './actions';
import * as servicesApi from './api';

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

export default function*() {
  yield takeLatest(GET_SERVICES, onGetServices);
}
