import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_PROFESSOR_ERROR,
    ADD_PROFESSOR_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_ERROR,
    GET_IMG_RESPONSE,
    SNACK_PUT_SUCCESS,
    SNACK_PUT_ERROR,
    UPDATE_PROF_SUCCESS,
    UPDATE_PROF_ERROR,
    TOKEN_UNVALID,
    EMPTY_IMG_REQUEST,
    GET_APPS_BUY_REQUEST
} from "./actions/actionTypes";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeEvery("OPEN_DRAWER_REQUEST", openDrawer);
    yield takeEvery("CLOSE_DRAWER_REQUEST", closeDrawer);
    yield takeEvery("LOGIN_REQUEST", login);
    yield takeEvery('LOGOUT_REQUEST', logout);
    yield takeEvery('ADD_PROFESSOR_REQUEST', add_professor);
    yield takeEvery('CHANGE_PASSWORD_REQUEST', change_password);
    yield takeEvery('GET_STUDENTS_REQUEST', get_all_students);
    yield takeEvery('GET_IMG_REQUEST', show_image);
    yield takeEvery('SNACK_PUT_REQUEST', snack_req);
    yield takeEvery('UPDATE_PROF_REQUEST', update_prof);
    yield takeEvery('UPLOAD_IMG_REQUEST', uploadImage);
    yield takeEvery('VERIFY_TOKEN_REQUEST', verifyToken);
    yield takeEvery('STUDENT_PROFILE_REQUEST', student_profile);
    yield takeEvery('GET_CLASSES_REQUEST', getUserClasses);
    yield takeEvery('GET_APPS_BUY_REQUEST', getAppsBuy);
}

//GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
function fetchProf(datas) {

    const url = "http://176.31.252.134:9001/api/v1/users/" + datas.id;

    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });
}

//Try to Login
function login_in(logs){

    const datas = new URLSearchParams();
    datas.append('email', logs.email);
    datas.append('password', logs.password);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:7001/api/v1/login',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: datas
    })
}

//ADD PROF FROM API
function add_professor_api(add){

    const datas = new URLSearchParams();
    datas.append('nom', add.surname);
    datas.append('prenom', add.name);
    datas.append('email', add.email)
    datas.append('token', add.token);
    datas.append('directorId', 1);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/users/add',
        data: datas
    })

}

function change_password_api(datas){

    const datasTosend = new URLSearchParams();
    datasTosend.append('email', datas.email);


    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/login/reset',
        data: datasTosend
    })
}

function get_all_students_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('typeUser', datas.typeUser);
    datasTosend.append('idUser', datas.idUser);
    datasTosend.append('idClasse', datas.idClasse);

    var url = datas.idClasse == 0 ? 'http://176.31.252.134:7001/api/v1/trombi' : 'http://176.31.252.134:7001/api/v1/trombi/byClasse';

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        },
        data: datasTosend
    });
}

function update_prof_api(datas){


    const datasTosend = new URLSearchParams();
    datasTosend.append('idUser', datas.idProf);
    datasTosend.append('nomUser', datas.nomProf);
    datasTosend.append('prenomUser', datas.prenomProf);
    datasTosend.append('emailUser', datas.emailProf);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/users/update',
        data: datasTosend
    })

}

function upload_img_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('picProf', datas.file);
    datasTosend.append('idUser', datas.idProf);
    datasTosend.append('emailUser', datas.email);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:7001/api/v1/users/picProf',
        headers: {
            token: datas.token
        },
        data: datasTosend
    });

}

function verify_token_api(datas){

    const datasTosend = new URLSearchParams();
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/tokens/verifyToken',
        data: datasTosend
    });

}

function student_profile_api(datas){

    return axios({
        method: 'get',
        url: 'http://176.31.252.134:9001/api/v1/eleves/' + datas.id,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        },
    });

}

function get_user_classes_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('typeUser', datas.typeUser);
    datasTosend.append('idUser', datas.idUser);

    return axios({
        method: 'get',
        url: 'http://176.31.252.134:7001/api/v1/trombi/classes',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        },
        data: datasTosend
    });

}

function get_apps_buy(datas){

    const url = "http://176.31.252.134:7001/api/v1/store";

    const datasTosend = new FormData();
    datasTosend.append('idType', '0');
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });
}

//DRAWER

function* openDrawer(){

    yield put({type: "OPEN_DRAWER_SUCCESS", opened: true});
}

function* closeDrawer(){

    yield put({type: "CLOSE_DRAWER_SUCCESS", opened: false});
}

function* login(logs){

    var datas = {
        'email': logs.email,
        'password': logs.pass
    };

    try{

        const response = yield call(login_in, datas);

        console.log(response);

        if (response.data.success === true) {
            const token = response.data.token;
            const user_id = response.data.currUser;
            const director = response.data.typeUser === 1 ? false : true;
            const typeUser = response.data.typeUser;
            const idEcole = response.data.idEcole;
            yield put({ type: "LOGIN_SUCCESS", token: token, user_id: user_id, director: director, typeUser: typeUser, idEcole: idEcole});

            var datas_2 = {
                token: token,
                id: user_id
            };

            const response_2 = yield call(fetchProf, datas_2);

            if (response_2.data.status === 200) {

                const lastname = response_2.data.response[0].nomUser;
                const name = response_2.data.response[0].prenomUser;
                const email = response_2.data.response[0].emailUser;
                const pic = response_2.data.response[0].picPath;

                yield  put({ type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email, pic: pic});

            }
        }

    }catch (e) {

        yield put({ type: "LOGIN_ERROR", e});

    }

}

function* logout(){

    try{
        yield put({type: 'LOGOUT_SUCCESS'});
    }catch (e) {
        yield put({type: 'LOGOUT_ERROR'});
    }

}

function* add_professor(datas){

    try{

        const response = yield call(add_professor_api, datas);

        if (response.data.status === 200){
            yield put({type: ADD_PROFESSOR_SUCCESS});
        }else if (response.data.status === 501){
            yield put({type: ADD_PROFESSOR_ERROR, error: 501});
        }

    }catch (e) {

        yield put({type: ADD_PROFESSOR_ERROR, error: e.response.status});

    }

}

function* change_password(datas){

    try{

        const response = yield call(change_password_api, datas);

        if (response.data.status === 200){
            yield put({type: CHANGE_PASSWORD_SUCCESS});

            yield put({type: SNACK_PUT_SUCCESS, message: 'Votre mot de passe vient de vous etre envoye par mail.'});
        }else{

            const error = response.data.status;

            yield put({type: CHANGE_PASSWORD_ERROR, errorCode: error});

            if (error === 502){
                yield put({type: SNACK_PUT_ERROR, message: 'Erreur. Aucun compte n\'est lie a cette Email.'});
            }

        }

    }catch (e) {

        yield put({type: CHANGE_PASSWORD_ERROR});

    }
}

function* get_all_students(datas){

    try{

        const response = yield call(get_all_students_api, datas);

        const content = JSON.stringify(response.data.response);

        if (response.data.status === 200){
            yield put({type: GET_STUDENTS_SUCCESS, content: content});
        }else{
            yield put({type: GET_STUDENTS_ERROR});
        }

    }catch (e) {


    }
}

function*   show_image(file){

    try{

        yield put({type: GET_IMG_RESPONSE, file_preview: file.file, prevImage: true, file_upload: file.file_obj});

    }catch(e){

    }

}

function* snack_req(req){

    try{

        if (req.type === 'error'){
            yield put({type: SNACK_PUT_ERROR, message: req.message});
        }else{
            yield put({type: SNACK_PUT_SUCCESS, message: req.message});
        }

    }catch(e){

    }

}

function* update_prof(datas){

    try{

    const response = yield call(update_prof_api, datas);

    if (response.data.status === 200) {
        yield put({type: UPDATE_PROF_SUCCESS});
        yield put({type: SNACK_PUT_SUCCESS, message: 'Vos informations ont bien ete mises a jour.'});


        var datas_2 = {
            token: datas.token,
            id: datas.idProf
        };

        const response_2 = yield call(fetchProf, datas_2);
        if (response_2.data.status === 200) {

            const lastname = response_2.data.response[0].nomUser;
            const name = response_2.data.response[0].prenomUser;
            const email = response_2.data.response[0].emailUser;
            const pic = response_2.data.response[0].picPath;

            yield  put({type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email, pic: pic});
        }
    }else {
        yield put({type: UPDATE_PROF_ERROR})
    }
    }catch (e) {
        
    }
    
}

function* uploadImage(datas){

    try{

        const response = yield call(upload_img_api, datas);

        if (response.data.status === 200){

            var datas_2 = {
                token: datas.token,
                id: datas.idProf
            };
            const response_2 = yield call(fetchProf, datas_2);

            if (response_2.data.status === 200) {
                const lastname = response_2.data.response[0].nomUser;
                const name = response_2.data.response[0].prenomUser;
                const email = response_2.data.response[0].emailUser;
                const pic = response_2.data.response[0].picPath;

                yield  put({type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email, pic: pic});
                yield put({type: EMPTY_IMG_REQUEST});
                yield put({type: SNACK_PUT_SUCCESS, message: 'Votre photo a bien éte mise a jour.'});
            }
        }

    }catch (e) {

    }

}

function* verifyToken(datas){

    try{

        const response = yield call(verify_token_api, datas);

        if (response.data.name === 'JsonWebTokenError'){
            yield put({type: TOKEN_UNVALID});
        }



    }catch (e) {

    }

}

function* student_profile(datas){

    try{

        const response = yield call(student_profile_api, datas);

        if (response.data.status === 200){
            const nomEleve = response.data.response[0].nomEleve;
            const prenomEleve = response.data.response[0].prenomEleve;
            const noEleve = response.data.response[0].BAE;

            yield put({type: 'STUDENT_PROFILE_SUCCESS', nomEleve: nomEleve, prenomEleve: prenomEleve, noEleve: noEleve})

        }

    }catch (e) {

    }

}

function* getUserClasses(datas){

    try{

        const response = yield call(get_user_classes_api, datas);

        if (response.data.status === 200){

            const classes = response.data.response;

            yield put({type: "GET_CLASSES_SUCCESS", classes: classes });

        }

    }catch (e) {

    }

}

function* getAppsBuy(datas){

    try{

        const response = yield call(get_apps_buy, datas);

        console.log(response);

        if (response.data.status === 200){

            const apps = JSON.stringify(response.data.response);

            yield put({type: "GET_APPS_BUY_SUCCESS", apps: apps });

        }

    }catch (e) {

    }

}