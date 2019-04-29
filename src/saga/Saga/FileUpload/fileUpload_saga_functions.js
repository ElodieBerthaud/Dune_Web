import {EMPTY_IMG_REQUEST, GET_IMG_RESPONSE, SNACK_PUT_SUCCESS, SNACK_PUT_ERROR} from "../../../actions/actionTypes";
import { put, call } from "redux-saga/es/effects";
import {upload_img_api, upload_file_api} from '../../Api/FileUpload/upload_api_functions';
import {fetchProf} from "../../Api/Professor/professor_api_functions";
import {get_files} from './getFiles_saga_functions';

//open image viewer
export function*   show_image(file){

    try{

        yield put({type: GET_IMG_RESPONSE, file_preview: file.file, prevImage: true, file_upload: file.file_obj});

    }catch(e){

    }

}


//Upload image on professor or student account
export function* uploadImage(datas){

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
                const response_2 = yield call(fetchProf, datas_2);
                yield put({type: SNACK_PUT_SUCCESS, message: 'Votre photo a bien éte mise a jour.'});
            }else{
                yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});

            }
        }

    }catch (e) {
        yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});
    }

}

//Update a file to the fileManager
export function* uploadFile(datas){

    try{

        const response = yield call(upload_file_api, datas);

        if (response.data.status === 200){

            yield put({type: SNACK_PUT_SUCCESS, message: 'Votre fichier a bien été ajouté.'});

        }else{
            yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});
        }

    }catch (e) {

        yield put({type: SNACK_PUT_ERROR, message: 'Une erreur est survenue.'});

    }

}

