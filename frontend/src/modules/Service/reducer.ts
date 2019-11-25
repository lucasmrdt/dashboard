import { GET_SERVICES, GET_SERVICES_FAILURE, GET_SERVICES_SUCCESS } from './actions';

import { Service } from './types';
import { Status } from 'types/Status';
import { Action } from 'types/Redux';

export interface State {
  status: Status;
  services: Service[];
}

const initialState: State = {
  status: Status.default,
  services: [],
};

const serviceReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case GET_SERVICES: {
      return {
        ...state,
        status: Status.loading,
      };
    }

    case GET_SERVICES_SUCCESS: {
      const { services } = action.payload;
      return {
        ...state,
        services,
        status: Status.success,
      };
    }

    case GET_SERVICES_FAILURE: {
      return {
        ...state,
        status: Status.failed,
      };
    }

    default:
      return state;
  }
};

export default serviceReducer;
