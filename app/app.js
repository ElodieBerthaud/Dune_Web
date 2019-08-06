import 'regenerator-runtime/runtime';
import '@babel/register';
import {StripeProvider} from 'react-stripe-elements';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';


import { BrowserRouter } from 'react-router-dom';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { PersistGate } from 'redux-persist/lib/integration/react';
import reduxReset from 'redux-reset';
import registerServiceWorker from './registerServiceWorker';
import Loader from './components/Main/Loader';
import App from './containers/App';
import { watcherSaga } from './saga/sagas';
import rootReducer from './store';

//
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['login', 'user', 'showDash']
};

const pReducer = persistReducer(persistConfig, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const enHanceCreateStore = compose(
  applyMiddleware(sagaMiddleware),
  reduxReset(),
    reduxDevTools
)(createStore);
const store = enHanceCreateStore(pReducer);

const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
          <StripeProvider apiKey="pk_test_BSNzEnrgwUv0HK3wvUGiaDOs">
              <App />
          </StripeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('app'));
registerServiceWorker();

export default store;
