import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_WIDGETS,
  getWidgetsSuccess,
  getWidgetsFailure,
  SUBSCRIBE_TO_WIDGET,
  subscribeToWidgetSuccess,
  subscribeToWidgetFailure,
} from './actions';
import * as widgetsApi from './api';

import { Widget } from './types';
import { Action } from 'types/Redux';

function* onGetWidgets() {
  try {
    const { success, data } = yield call(widgetsApi.getWidgets);
    if (!success) {
      throw new Error(data);
    }

    const { widgets }: { widgets: Widget[] } = data;
    yield put(getWidgetsSuccess(widgets));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(getWidgetsFailure(e.message));
  }
}

function* onSubscribeToWidget(action: Action) {
  console.log(action);
  const { serviceName, widgetName } = action.payload;

  try {
    const { success, data } = yield call(
      widgetsApi.subscribeToWidget,
      serviceName,
      widgetName
    );
    if (!success) {
      throw new Error(data);
    }

    const { widget } = data;
    yield put(subscribeToWidgetSuccess(widget));
  } catch (e) {
    console.log('Saga failed', e);
    yield put(subscribeToWidgetFailure(e.message));
  }
}

export default function*() {
  yield takeLatest(GET_WIDGETS, onGetWidgets);
  yield takeLatest(SUBSCRIBE_TO_WIDGET, onSubscribeToWidget);
}
