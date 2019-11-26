import Api from 'services/api';
import { BASE_URI } from 'constants/api';

import { Widget } from './types';

export const getWidgets = () => Api.get<Widget[]>(`${BASE_URI}/widget`);

export const getWidgetData = <T = any>(widgetId: string) =>
  Api.get<T>(`${BASE_URI}/widget/data/${widgetId}`);

export const updateWidgetParams = <T = any>(widgetId: string, params: T) =>
  Api.post<T>(`${BASE_URI}/widget/${widgetId}`, { params });

export const subscribeToWidget = (serviceName: string, widgetName: string) =>
  Api.post<Widget>(`${BASE_URI}/widget/subscribe/${serviceName}/${widgetName}`);

export const unsubscribeToWidget = (widgetId: string) =>
  Api.post<Widget>(`${BASE_URI}/widget/unsubscribe/${widgetId}`);
