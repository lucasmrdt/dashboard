import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducer from 'reducer';
import saga from 'saga';

import {State as StateReducer} from 'reducer';

const persistingTest = createWhitelistFilter('testState', ['status']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['testState'],
  transforms: [persistingTest],
  // @xxx autoMergeLevel2 allows to merge each reducer states with persisted fields of each one.
  stateReconciler: autoMergeLevel2,
};

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store);

export type State = StateReducer;

sagaMiddleware.run(saga);
