import { combineReducers } from 'redux';
import drawer from './reducers/Drawer/drawerReducer';
import professor from './reducers/Professors/ProfessorReducer';
import login from './reducers/Login/LoginReducer';
import manageProfessor from './reducers/Professors/manageProfReducer';
import user from './reducers/User/UserReducer';
import password from './reducers/Login/PasswordReducer';
import students from './reducers/Students/StudentsReducer';
import uploadimg from './reducers/FileUpload/UploadImgReducer';
import snackContent from './reducers/Snackbar/SnackReducer';
import updateProf from './reducers/Professors/UpdateProf';
import studentProfile from './reducers/Students/StudentProfileReducer';
import classes from './reducers/School/ClassesReducer';
import storeBuy from './reducers/Store/StoreBuyReducer';
import loading from './reducers/Loader/LoadingReducer';
import appPage from './reducers/Store/AppPageReducer';
import appRegistred from './reducers/Store/AppRegistredReducer';
import notification from './reducers/Notifications/notificationsReducer';
import showNotif from './reducers/Notifications/showNotifReducer';
import reload from './reducers/Loader/reloadReducer';
import showDash from './reducers/Dashboard/showDashReducer';
import showDashTmp from './reducers/Dashboard/showDashTmpReducer';
import getAvis from './reducers/Views/avisReducer';
import nbAvis from "./reducers/Views/NbAvisReducer";

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
    showDashTmp,
    getAvis,
    nbAvis
});

const rootReducer = (state, action) => {

    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return reducers(state, action)
}

export default rootReducer;