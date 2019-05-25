/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import drawer from './store/reducers/Drawer/drawerReducer';
import professor from './store/reducers/Professors/ProfessorReducer';
import login from './store/reducers/Login/LoginReducer';
import manageProfessor from './store/reducers/Professors/manageProfReducer';
import user from './store/reducers/User/UserReducer';
import password from './store/reducers/Login/PasswordReducer';
import students from './store/reducers/Students/StudentsReducer';
import uploadimg from './store/reducers/FileUpload/UploadImgReducer';
import snackContent from './store/reducers/Snackbar/SnackReducer';
import updateProf from './store/reducers/Professors/UpdateProf';
import studentProfile from './store/reducers/Students/StudentProfileReducer';
import classes from './store/reducers/School/ClassesReducer';
import storeBuy from './store/reducers/Store/StoreBuyReducer';
import loading from './store/reducers/Loader/LoadingReducer';
import appPage from './store/reducers/Store/AppPageReducer';
import appRegistred from './store/reducers/Store/AppRegistredReducer';
import notification from './store/reducers/Notifications/notificationsReducer';
import showNotif from './store/reducers/Notifications/showNotifReducer';
import reload from './store/reducers/Loader/reloadReducer';
import showDash from './store/reducers/Dashboard/showDashReducer';
import showDashTmp from './store/reducers/Dashboard/showDashTmpReducer';
import getAvis from './store/reducers/Views/avisReducer';
import nbAvis from './store/reducers/Views/NbAvisReducer';
import files from './store/reducers/FileUpload/getFilesReducer';
import studentResults from './store/reducers/Students/StudentResultsReducer';
import dashboard from './store/reducers/Dashboard/DashboardReducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
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
    nbAvis,
    files,
    studentResults,
    dashboard,
    route: routeReducer,
    ...injectedReducers,
  });
}
