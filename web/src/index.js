import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import rootReducer from "./reducers/index.js";
import { watcherSaga } from "./sagas";

import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import registerServiceWorker from "./registerServiceWorker";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loader from '../src/components/Loader';
import reduxReset from 'redux-reset';

//
const persistConfig = {
    key: 'root',
    storage: storage,
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
    reduxReset(),  // Will use 'RESET' as default action.type to trigger reset
    reduxDevTools
)(createStore)
const store = enHanceCreateStore(pReducer)

const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

export default store;
