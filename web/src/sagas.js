import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeEvery("API_CALL_REQUEST", getProf);
    yield takeEvery("OPEN_DRAWER_REQUEST", openDrawer);
    yield takeEvery("CLOSE_DRAWER_REQUEST", closeDrawer);
}

//GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
function fetchProf() {
    console.log("HERE");
    return axios({
        method: "get",
        url: "http://176.31.252.134:9001/api/v1/profs/1"
    });
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