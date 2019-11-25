import {Widget} from 'modules/Widget/types';

export interface Service {
  name: string;
  icon: string;
  needAuth: boolean;
  widgets: Widget[];
}
