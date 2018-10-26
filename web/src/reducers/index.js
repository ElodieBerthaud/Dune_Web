import { combineReducers } from 'redux';
import drawer from './drawerReducer';
import professor from './ProfessorReducer';
import login from './LoginReducer';
import manageProfessor from './manageProfReducer';

const reducers =  combineReducers({
    drawer,
    professor,
    login,
    manageProfessor
});

export default reducers;