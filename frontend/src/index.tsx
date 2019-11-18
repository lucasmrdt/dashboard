// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'store';
import {BrowserRouter as Router} from 'react-router-dom';
import TestNavigator from 'modules/Test/navigators/TestNavigator';
import 'antd/dist/antd.css';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          // @ts-ignore
          persistor={persistor}>
          <Router>
            <TestNavigator />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
