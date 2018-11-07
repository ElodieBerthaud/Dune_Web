import { combineReducers } from 'redux';
import drawer from './drawerReducer';
import professor from './ProfessorReducer';
import login from './LoginReducer';
import manageProfessor from './manageProfReducer';
import user from './UserReducer';
import password from './PasswordReducer';
import students from './StudentsReducer';
import uploadimg from './UploadImgReducer';
import snackContent from './SnackReducer';
import updateProf from './UpdateProf';

const reducers =  combineReducers({
    drawer,
    professor,
    login,
    manageProfessor,
    user,
    password,
    students,
    uploadimg,
    snackContent,
    updateProf
});

const rootReducer = (state, action) => {

    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return reducers(state, action)
}

export default rootReducer;