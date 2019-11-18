import {combineReducers} from 'redux';
import testReducer from 'modules/Test/testReducer';

import {State as TestState} from 'modules/Test/testReducer';

export type State = {
  testState: TestState;
};

const state = combineReducers({
  testState: testReducer,
});

export default state;
