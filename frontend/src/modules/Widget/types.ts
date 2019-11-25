import { SFC } from 'react';

export interface Widget {
  _id: string;
  name: string;
  description: string;
  params: { [key: string]: any };
}

export interface DefaultParams {
  refreshInterval: number;
}

export type WidgetImplementation<U = any, T = DefaultParams> = SFC<{
  widget: Widget;
  data: U;
  params: T & DefaultParams;
  updateParams: (newParams: T & DefaultParams) => any;
}>;
