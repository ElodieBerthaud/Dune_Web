import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_PROFESSOR_ERROR,
    ADD_PROFESSOR_SUCCESS,
    GET_USER_INFOS,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR, GET_STUDENTS_SUCCESS, GET_STUDENTS_ERROR, GET_IMG_RESPONSE
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

    console.log(datas);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/login',
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

    console.log(datas);

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

    const datasTosend = new URLSearchParams();
    datasTosend.append('token', datas.token);


    return axios({
        method: 'get',
        url: 'http://176.31.252.134:9001/api/v1/eleves',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    })
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
        if (response.data.success === true) {
            const token = response.data.token;
            const user_id = response.data.currUser;
            const director = response.data.typeUser === 1 ? false : true;
            yield put({ type: "LOGIN_SUCCESS", token: token, user_id: user_id, director: director});

            var datas_2 = {
                token: token,
                id: user_id
            };

            const response_2 = yield call(fetchProf, datas_2);
            if (response_2.data.status === 200) {

                const lastname = response_2.data.response[0].nomUser;
                const name = response_2.data.response[0].prenomUser;
                const email = response_2.data.response[0].emailUser;

                yield  put({ type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email});

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

        console.log("ERROR !!!" + e.response.status);

        yield put({type: ADD_PROFESSOR_ERROR, error: e.response.status});

    }

}

function* change_password(datas){

    try{

        const response = yield call(change_password_api, datas);

        console.log(response);

        if (response.data.status === 200){
            yield put({type: CHANGE_PASSWORD_SUCCESS});
        }else{

            const error = response.data.status;

            yield put({type: CHANGE_PASSWORD_ERROR, errorCode: error});
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

        yield put({type: GET_IMG_RESPONSE, file: file.file});

    }catch(e){

    }

}