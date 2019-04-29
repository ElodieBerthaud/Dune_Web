import {SNACK_PUT_SUCCESS, SNACK_PUT_ERROR, RELOAD_PAGE} from "../../../actions/actionTypes";
import { put, call } from "redux-saga/es/effects";
import {get_files_api, update_files_api, delete_file_api} from '../../Api/FileUpload/getFiles_api_functions';

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

export function *update_files(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

        const response = yield call(update_files_api, datas);

        if (response.data.status === 200){

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Le fichier a bien été mit à jour."});

        }else{
            yield put({type: "END_LOADING"});

        }

    }catch{
        yield put({type: "END_LOADING"});

    }

}


//Delete a file from the fileManager
export function* delete_file(datas){

    try{

        const response = yield call(delete_file_api, datas);

        if (response.data.status === 200){

            yield put({type: SNACK_PUT_SUCCESS, message: 'Votre fichier a bien été supprimé.'});

            yield put({type: RELOAD_PAGE});

        }else{
            yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});
        }

    }catch (e) {

        yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});

    }

}