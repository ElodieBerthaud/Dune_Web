import { takeEvery } from 'redux-saga/es/effects';
import { show_image, uploadImage, uploadFile } from './Saga/FileUpload/fileUpload_saga_functions';
import {
  login, logout, change_password, verifyToken, changeIdentifiant, changePass
} from './Saga/Login/login_saga_function';
import {
  getNotifs, showNotif, validateApp, readNotif
} from './Saga/Notifications/notifications_saga_functions';
import { add_professor, update_prof } from './Saga/Professor/professor_saga_functions';
import { getUserClasses } from './Saga/School/school_saga_functions';
import { snack_req } from './Saga/SnackBar/snackbar_saga_functions';
import {
  getAppsBuy, getApp, getAppRegistred, getAppRegistredNbr, askApp, buyApp
} from './Saga/Store/store_saga_functions';
import {
  student_profile, addStudent, get_all_students, get_students_nbr, get_student_results, updateStudent
} from './Saga/Student/student_saga_functions';
import { getAvis, getNbAvis, addAvis } from './Saga/Views/views_saga_functions';
import { openDrawer, closeDrawer } from './Saga/Drawer/drawer_saga_functions';
import { get_files, update_files, delete_file } from './Saga/FileUpload/getFiles_saga_functions';
import { get_gamesnbr } from './Saga/Dashboard/dashboard_saga_functions';
import {get_sub_infos} from './Saga/Subs/Subscribe';


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeEvery('OPEN_DRAWER_REQUEST', openDrawer);
  yield takeEvery('CLOSE_DRAWER_REQUEST', closeDrawer);
  yield takeEvery('LOGIN_REQUEST', login);
  yield takeEvery('LOGOUT_REQUEST', logout);
  yield takeEvery('ADD_PROFESSOR_REQUEST', add_professor);
  yield takeEvery('CHANGE_PASSWORD_REQUEST', change_password);
  yield takeEvery('GET_STUDENTS_REQUEST', get_all_students);
  yield takeEvery('GET_STUDENTSNBR_REQUEST', get_students_nbr);
  yield takeEvery('GET_IMG_REQUEST', show_image);
  yield takeEvery('SNACK_PUT_REQUEST', snack_req);
  yield takeEvery('UPDATE_PROF_REQUEST', update_prof);
  yield takeEvery('UPLOAD_IMG_REQUEST', uploadImage);
  yield takeEvery('VERIFY_TOKEN_REQUEST', verifyToken);
  yield takeEvery('STUDENT_PROFILE_REQUEST', student_profile);
  yield takeEvery('GET_CLASSES_REQUEST', getUserClasses);
  yield takeEvery('GET_APPS_BUY_REQUEST', getAppsBuy);
  yield takeEvery('CHANGE_IDENTI_REQUEST', changeIdentifiant);
  yield takeEvery('CHANGE_PASS_REQUEST', changePass);
  yield takeEvery('ADD_ELEVE_REQUEST', addStudent);
  yield takeEvery('GET_APP_REQUEST', getApp);
  yield takeEvery('GET_APPS_REGISTRED_REQUEST', getAppRegistred);
  yield takeEvery('GET_APPNBR_REQUEST', getAppRegistredNbr);
  yield takeEvery('ASK_APP_REQUEST', askApp);
  yield takeEvery('BUY_APP_REQUEST', buyApp);
  yield takeEvery('GET_NOTIFS_REQUEST', getNotifs);
  yield takeEvery('SHOW_NOTIF_REQUEST', showNotif);
  yield takeEvery('VALIDATE_APP_REQUEST', validateApp);
  yield takeEvery('READ_NOTIF_REQUEST', readNotif);
  yield takeEvery('ADD_AVIS_REQUEST', addAvis);
  yield takeEvery('GET_AVIS_REQUEST', getAvis);
  yield takeEvery('GET_NB_AVIS_REQUEST', getNbAvis);
  yield takeEvery('UPLOAD_FILE_REQUEST', uploadFile);
  yield takeEvery('GET_FILES_REQUEST', get_files);
  yield takeEvery('STUDENT_RESULTS_REQUEST', get_student_results);
  yield takeEvery('UPDATE_FILE', update_files);
  yield takeEvery('UPDATE_STUDENT', updateStudent);
  yield takeEvery('DELETE_FILE', delete_file);
  yield takeEvery('GET_DASHBOARD_REQUEST', get_gamesnbr);
  yield takeEvery('GET_SUB_INFO_REQUEST', get_sub_infos);
}
