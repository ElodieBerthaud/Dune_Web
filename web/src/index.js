import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import reducers from "./reducers/index.js";
import { watcherSaga } from "./sagas";

import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import registerServiceWorker from "./registerServiceWorker";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loader from '../src/components/Loader';

//
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['login']
};

const pReducer = persistReducer(persistConfig, reducers);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
let store = createStore(
    pReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
