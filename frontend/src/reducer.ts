import { combineReducers } from 'redux';
import authReducer from 'modules/Auth/reducer';
import serviceReducer from 'modules/Service/reducer';
import widgetReducer from 'modules/Widget/reducer';

import { State as AuthState } from 'modules/Auth/reducer';
import { State as ServiceState } from 'modules/Service/reducer';
import { State as WidgetState } from 'modules/Widget/reducer';

export type State = {
  authState: AuthState;
  serviceState: ServiceState;
  widgetState: WidgetState;
};

const state = combineReducers({
  authState: authReducer,
  serviceState: serviceReducer,
  widgetState: widgetReducer,
});

export default state;
