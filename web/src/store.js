import {createStore, combineReducers} from 'redux'
import CountReducer from './reducers/CountReducer'
const store = createStore(CountReducer);
export default store;