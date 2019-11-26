import { SFC } from 'react';

export interface Widget {
  _id: string;
  icon: string;
  name: string;
  description: string;
  params: { [key: string]: any };
}

export interface DefaultParams {
  refreshInterval: number;
}

export type ParamsUpdater = (key: string, value: any) => any;

export type OptionHOC = (updater: ParamsUpdater, params: { [key: string]: any }) => any;

export type WidgetImplementation<U = any, T = any> = SFC<{
  data: U;
  params: T & DefaultParams;
}>;
