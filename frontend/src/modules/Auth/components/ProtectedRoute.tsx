import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CONNECT_PATH } from '../constants/authRoutes';

import { RouteProps } from 'react-router-dom';

export interface StateProps {
  isConnected: boolean;
}

type Props = StateProps & RouteProps;

const ProtectedRoute = ({ isConnected, ...props }: Props) =>
  isConnected ? <Route {...props} /> : <Redirect to={CONNECT_PATH} />;

export default ProtectedRoute;
