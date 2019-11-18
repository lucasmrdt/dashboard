import {State as StoreState} from 'store';

export type State = StoreState;

export interface Action {
  type: string;
  payload: {[key: string]: any};
}
