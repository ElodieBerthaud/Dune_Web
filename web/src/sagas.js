import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {ADD_PROFESSOR_ERROR, ADD_PROFESSOR_SUCCESS} from "./actions/actionTypes";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeEvery("API_CALL_REQUEST", getProf);
    yield takeEvery("OPEN_DRAWER_REQUEST", openDrawer);
    yield takeEvery("CLOSE_DRAWER_REQUEST", closeDrawer);
    yield takeEvery("LOGIN_REQUEST", login);
    yield takeEvery('LOGOUT_REQUEST', logout);
    yield takeEvery('ADD_PROFESSOR_REQUEST', add_professor);
}

//GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
function fetchProf() {
    console.log("HERE");

    return axios({
        method: "get",
        url: "http://176.31.252.134:9001/api/v1/profs/1",
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
        url: 'http://176.31.252.134:9001/api/v1/profs/add',
        data: datas
    })

}

// worker saga: makes the api call when watcher saga sees the action
function* getProf() {
    try {
        const response = yield call(fetchProf);
        const nomProf = response.data.response[0].nomProf;
        const prenomProf = response.data.response[0].prenomProf;
        const emailProf = response.data.response[0].emailProf;

        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_SUCCESS", nomProf, prenomProf, emailProf });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
    }
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

    console.log(logs.pass);

    try{

        const response = yield call(login_in, datas);
        if (response.data.success == true) {
            const token = response.data.token;
            const user_id = response.data.currUser;
            yield put({ type: "LOGIN_SUCCESS", token: token, user_id: user_id});
        }

    }catch (e) {
        yield put({ type: "LOGIN_ERROR", e});

    }

}

function* logout(){

    console.log('LOGOUT');

    try{
        yield put({type: 'LOGOUT_SUCCESS'});
    }catch (e) {
        yield put({type: 'LOGOUT_ERROR'});
    }

}

function* add_professor(datas){

    console.log('ADD PROFESSOR');

    console.log(datas);


    try{

        const response = yield call(add_professor_api, datas);
        console.log(response);

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