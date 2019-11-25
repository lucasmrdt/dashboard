import React from 'react';
// import TestContainer from 'modules/Test/containers/TestContainer';
import ConnectFormContainer from 'modules/Auth/containers/ConnectFormContainer';

class ConnectScreen extends React.PureComponent {
  static navigationOptions = {};

  render() {
    return <ConnectFormContainer />;
  }
}

export default ConnectScreen;
