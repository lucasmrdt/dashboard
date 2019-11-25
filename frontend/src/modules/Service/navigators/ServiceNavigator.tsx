import React from 'react';
import ProtectedRouteContainer from 'modules/Auth/containers/ProtectedRouteContainer';
import ServiceScreen from 'modules/Service/screens/ServiceScreen';
import { SERVICE_PATH } from 'modules/Service/constants/serviceRoutes';

const AuthNavigator = () => (
  <>
    <ProtectedRouteContainer path={SERVICE_PATH}>
      <ServiceScreen />
    </ProtectedRouteContainer>
  </>
);

export default AuthNavigator;
