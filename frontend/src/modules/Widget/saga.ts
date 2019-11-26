import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_WIDGETS,
  getWidgetsSuccess,
  getWidgetsFailure,
  SUBSCRIBE_TO_WIDGET,
  subscribeToWidgetSuccess,
  subscribeToWidgetFailure,
  UNSUBSCRIBE_TO_WIDGET,
  unsubscribeToWidgetFailure,
  unsubscribeToWidgetSuccess,
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

function* onUnsubscribeToWidget(action: Action) {
  const { widgetId } = action.payload;

  try {
    const { success, data } = yield call(widgetsApi.unsubscribeToWidget, widgetId);
    if (!success) {
      throw new Error(data);
    }

    yield put(unsubscribeToWidgetSuccess());
  } catch (e) {
    console.log('Saga failed', e);
    yield put(unsubscribeToWidgetFailure(e.message));
  }
}

export default function*() {
  yield takeLatest(GET_WIDGETS, onGetWidgets);
  yield takeLatest(SUBSCRIBE_TO_WIDGET, onSubscribeToWidget);
  yield takeLatest(UNSUBSCRIBE_TO_WIDGET, onUnsubscribeToWidget);
}
