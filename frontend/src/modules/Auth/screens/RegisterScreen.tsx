import React from 'react';
// import TestContainer from 'modules/Test/containers/TestContainer';
import RegisterFormContainer from 'modules/Auth/containers/RegisterFormContainer';

class RegisterScreen extends React.PureComponent {
  static navigationOptions = {};

  render() {
    return <RegisterFormContainer />;
  }
}

export default RegisterScreen;
