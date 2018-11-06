import { combineReducers } from 'redux';
import drawer from './drawerReducer';
import professor from './ProfessorReducer';
import login from './LoginReducer';
import manageProfessor from './manageProfReducer';
import user from './UserReducer';
import password from './PasswordReducer';
import students from './StudentsReducer';
import uploadimg from './UploadImgReducer';


const reducers =  combineReducers({
    drawer,
    professor,
    login,
    manageProfessor,
    user,
    password,
    students,
    uploadimg
});

export default reducers;