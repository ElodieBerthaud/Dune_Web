import { combineReducers } from 'redux';
import drawer from './drawerReducer';
import professor from './ProfessorReducer';

const reducers =  combineReducers({
    drawer,
    professor
});

export default reducers;