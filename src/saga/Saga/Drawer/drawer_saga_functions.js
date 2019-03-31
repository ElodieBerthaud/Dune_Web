import { put } from "redux-saga/es/effects";

//DRAWER
export function* openDrawer(){

    yield put({type: "OPEN_DRAWER_SUCCESS", opened: true});
}

export function* closeDrawer(){

    yield put({type: "CLOSE_DRAWER_SUCCESS", opened: false});
}