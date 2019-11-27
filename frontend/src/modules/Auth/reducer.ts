import {
  AUTH_WITH_CREDENTIAL,
  AUTH_WITH_TOKEN,
  AUTH_FAILED,
  AUTH_SUCCESS,
  DISCONNECT,
} from 'modules/Auth/actions';

import { Status } from 'types/Status';
import { Action } from 'types/Redux';

export interface State {
  status: Status;
  jwtToken: string;
}

const initialState: State = {
  status: Status.loading,
  jwtToken: '',
};

const authReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AUTH_WITH_CREDENTIAL:
    case AUTH_WITH_TOKEN: {
      return {
        ...state,
        status: Status.loading,
      };
    }

    case AUTH_SUCCESS: {
      const { jwtToken } = action.payload;
      return {
        ...state,
        status: Status.success,
        jwtToken: jwtToken || state.jwtToken,
      };
    }

    case AUTH_FAILED: {
      return {
        ...state,
        status: Status.failed,
      };
    }

    case DISCONNECT: {
      return {
        ...state,
        jwtToken: '',
        status: Status.default,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
