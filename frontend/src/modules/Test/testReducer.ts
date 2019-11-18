import {TEST, TEST_SUCCESS, TEST_FAILED} from 'modules/Test/testActions';

import {Status} from 'types/Status';
import {Action} from 'types/Redux';

export interface State {
  status: Status;
}

const initialState: State = {
  status: 'default',
};

const testReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        status: 'loading',
      };

    case TEST_SUCCESS:
      return {
        ...state,
        status: 'success',
      };

    case TEST_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    default:
      return state;
  }
};

export default testReducer;
