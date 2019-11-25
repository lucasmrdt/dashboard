import { all, spawn } from 'redux-saga/effects';
import authSaga from 'modules/Auth/saga';
import serviceSaga from 'modules/Service/saga';
import widgetSaga from 'modules/Widget/saga';

function* sagas() {
  yield all([spawn(authSaga)]);
  yield all([spawn(serviceSaga)]);
  yield all([spawn(widgetSaga)]);
}

export default sagas;
