import {SNACK_PUT_SUCCESS, SNACK_PUT_ERROR} from "../../../actions/actionTypes";
import { put, call } from "redux-saga/es/effects";
import {get_files_api} from '../../Api/FileUpload/getFiles_api_functions';

export function *get_files(datas){

try{

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    const response = yield call(get_files_api, datas);

    console.log(response);

    if (response.data.status === 200){

        yield put({type: "GET_FILES_SUCCESS", files: JSON.stringify(response.data.response)});

        yield put({type: "END_LOADING"});

    }else{

    }

}catch{

}

}