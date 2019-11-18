import React from 'react';
import {Switch, Route} from 'react-router-dom';
import TestScreen from 'modules/Test/screens/TestScreen';
import {TEST_PATH} from 'modules/Test/constants/testRoutes';

const TestNavigator = () => (
  <Switch>
    <Route path={TEST_PATH}>
      <TestScreen />
    </Route>
  </Switch>
);

export default TestNavigator;
