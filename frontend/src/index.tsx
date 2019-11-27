import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'firebase';
import { store, persistor } from 'store';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthNavigator from 'modules/Auth/navigators/AuthNavigator';
import ServiceNavigator from 'modules/Service/navigators/ServiceNavigator';
import 'antd/dist/antd.css';
import './styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const firebaseConfig = {
  apiKey: 'AIzaSyAeit6gxh_OygLKCvYqoLmsRbamhMHsC_0',
  authDomain: 'epitech-dashboard-4032d.firebaseapp.com',
  databaseURL: 'https://epitech-dashboard-4032d.firebaseio.com',
  projectId: 'epitech-dashboard-4032d',
  storageBucket: 'epitech-dashboard-4032d.appspot.com',
  messagingSenderId: '293491858721',
  appId: '1:293491858721:web:4d8a6bee94e0cd2d27b260',
  measurementId: 'G-K3V4QN6K0Y',
};

firebase.initializeApp(firebaseConfig);

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
