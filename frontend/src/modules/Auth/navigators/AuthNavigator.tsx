import React from 'react';
import { Route } from 'react-router-dom';
import ConnectScreen from 'modules/Auth/screens/ConnectScreen';
import RegisterScreen from 'modules/Auth/screens/RegisterScreen';
import { CONNECT_PATH, REGISTER_PATH } from 'modules/Auth/constants/authRoutes';

const AuthNavigator = () => (
  <>
    <Route path={REGISTER_PATH}>
      <RegisterScreen />
    </Route>
    <Route path={CONNECT_PATH}>
      <ConnectScreen />
    </Route>
  </>
);

export default AuthNavigator;
