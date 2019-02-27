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
import studentProfile from './StudentProfileReducer';
import classes from './ClassesReducer';
import storeBuy from './StoreBuyReducer';
import loading from './LoadingReducer';
import appPage from './AppPageReducer';
import appRegistred from './AppRegistredReducer';
import notification from './notificationsReducer';
import showNotif from './showNotifReducer';
import reload from './reloadReducer';
import showDash from './showDashReducer';
import showDashTmp from './showDashTmpReducer';

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
    updateProf,
    studentProfile,
    classes,
    storeBuy,
    loading,
    appPage,
    appRegistred,
    notification,
    showNotif,
    reload,
    showDash,
    showDashTmp
});

const rootReducer = (state, action) => {

    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return reducers(state, action)
}

export default rootReducer;