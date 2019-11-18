import {takeLatest, call, put} from 'redux-saga/effects';
import {TEST, testSuccess, testFailed} from 'modules/Test/testActions';
import * as testApi from 'modules/Test/testApi';

function* onTest() {
  try {
    const response = yield call(testApi.test);
    console.log('Saga success', response);
    yield put(testSuccess());
  } catch (e) {
    console.log('Saga failed', e);
    yield put(testFailed());
  }
}

export default function*() {
  yield takeLatest(TEST, onTest);
}
