// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthNavigator from 'modules/Auth/navigators/AuthNavigator';
import ServiceNavigator from 'modules/Service/navigators/ServiceNavigator';
import 'antd/dist/antd.css';
import './styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          // @ts-ignore
          persistor={persistor}
        >
          <Router>
            <ServiceNavigator />
            <AuthNavigator />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
