import { takeLatest, call, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import {
  AUTH_WITH_CREDENTIAL,
  AUTH_WITH_TOKEN,
  REGISTER_WITH_CREDENTIAL,
  REGISTER_WITH_TOKEN,
  AUTH_SUCCESS,
  authSuccess,
  authFailed,
} from 'modules/Auth/actions';
import { getServices } from 'modules/Service/actions';
import * as authApi from 'modules/Auth/api';
import api from 'services/api';

import { Action, State } from 'types/Redux';

function* onAuthWithToken({ payload }: Action) {
  const { token } = payload;

  try {
    const { success, data } = yield call(authApi.authWithToken, token);
    if (!success) {
      throw new Error(data);
    }
    yield put(authSuccess(data.jwtToken));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(authFailed(e.message));
  }
}

function* onAuthWithCredential({ payload }: Action) {
  const { email, password } = payload;

  try {
    const { success, data } = yield call(authApi.authWithCredential, email, password);
    if (!success) {
      throw new Error(data);
    }
    yield put(authSuccess(data.jwtToken));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(authFailed(e.message));
  }
}

function* onRegisterWithToken({ payload }: Action) {
  const { email, name, token } = payload;

  try {
    const { success, data } = yield call(authApi.registerWithToken, email, name, token);
    if (!success) {
      throw new Error(data);
    }
    yield put(authSuccess(data.jwtToken));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(authFailed(e.message));
  }
}

function* onRegisterWithCredential({ payload }: Action) {
  const { email, name, password } = payload;

  try {
    const { success, data } = yield call(
      authApi.registerWithCredential,
      email,
      name,
      password
    );
    if (!success) {
      throw new Error(data);
    }
    yield put(authSuccess(data.jwtToken));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(authFailed(e.message));
  }
}

function* onAuthSuccess({ payload }: Action) {
  const { jwtToken } = payload;

  if (jwtToken) {
    api.setAuthToken(jwtToken);
  }
  yield put(getServices());
}

function* onRehydrate(action: Action) {
  if (!action || !action.payload) {
    yield put(authFailed('not jwt cached'));
    return;
  }

  const state = action.payload as State;
  if (!state.authState || !state.authState.jwtToken) {
    yield put(authFailed('not jwt cached'));
    return;
  }

  api.setAuthToken(state.authState.jwtToken);

  try {
    const { success, payload } = yield call(authApi.getMe);
    if (!success) {
      throw new Error(payload);
    }
    yield put(authSuccess());
  } catch (e) {
    yield put(authFailed(e.message));
  }
}

export default function*() {
  yield takeLatest(AUTH_WITH_TOKEN, onAuthWithToken);
  yield takeLatest(AUTH_WITH_CREDENTIAL, onAuthWithCredential);
  yield takeLatest(REGISTER_WITH_TOKEN, onRegisterWithToken);
  yield takeLatest(REGISTER_WITH_CREDENTIAL, onRegisterWithCredential);
  yield takeLatest(AUTH_SUCCESS, onAuthSuccess);
  yield takeLatest(REHYDRATE, onRehydrate);
}
