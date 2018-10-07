import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore() {
    return createStore(
        rootReducer,
        compose(applyMiddleware(sagaMiddleware), reduxDevTools)
    );
}