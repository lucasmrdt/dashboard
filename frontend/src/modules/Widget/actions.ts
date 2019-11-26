import { Widget } from './types';

export const ADD_WIDGET = 'ADD_WIDGET';
export const addWidget = (widget: Widget) => ({
  type: ADD_WIDGET,
  payload: { widget },
});

// @MARK Get widgets
export const GET_WIDGETS = 'GET_WIDGETS';
export const getWidgets = () => ({
  type: GET_WIDGETS,
});

export const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
export const getWidgetsSuccess = (widgets: Widget[]) => ({
  type: GET_WIDGETS_SUCCESS,
  payload: { widgets },
});

export const GET_WIDGETS_FAILURE = 'GET_WIDGETS_FAILURE';
export const getWidgetsFailure = (error: string) => ({
  type: GET_WIDGETS_FAILURE,
  payload: { error },
});

// @MARK Subscribe to widget
export const SUBSCRIBE_TO_WIDGET = 'SUBSCRIBE_TO_WIDGET';
export const subscribeToWidget = (serviceName: string, widgetName: string) => ({
  type: SUBSCRIBE_TO_WIDGET,
  payload: { serviceName, widgetName },
});

export const SUBSCRIBE_TO_WIDGET_SUCCESS = 'SUBSCRIBE_TO_WIDGET_SUCCESS';
export const subscribeToWidgetSuccess = (widget: Widget) => ({
  type: SUBSCRIBE_TO_WIDGET_SUCCESS,
  payload: { widget },
});

export const SUBSCRIBE_TO_WIDGET_FAILURE = 'SUBSCRIBE_TO_WIDGET_FAILURE';
export const subscribeToWidgetFailure = (error: string) => ({
  type: SUBSCRIBE_TO_WIDGET_FAILURE,
  payload: { error },
});

export const UNSUBSCRIBE_TO_WIDGET = 'UNSUBSCRIBE_TO_WIDGET';
export const unsubscribeToWidget = (widgetId: string) => ({
  type: UNSUBSCRIBE_TO_WIDGET,
  payload: { widgetId },
});

export const UNSUBSCRIBE_TO_WIDGET_SUCCESS = 'UNSUBSCRIBE_TO_WIDGET_SUCCESS';
export const unsubscribeToWidgetSuccess = () => ({
  type: UNSUBSCRIBE_TO_WIDGET_SUCCESS,
});

export const UNSUBSCRIBE_TO_WIDGET_FAILURE = 'UNSUBSCRIBE_TO_WIDGET_FAILURE';
export const unsubscribeToWidgetFailure = (error: string) => ({
  type: UNSUBSCRIBE_TO_WIDGET_FAILURE,
  payload: { error },
});
