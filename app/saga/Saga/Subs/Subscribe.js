import { put, call } from 'redux-saga/es/effects';
import {
    get_sub_info_api,
    subscribe_api
} from '../../Api/Subs/subs_api_functions';

// Get all student of a user
export function* get_sub_infos(datas) {
    try {
        const response = yield call(get_sub_info_api, datas);

        if (response.status === 200) {
            console.log(response);
            yield put({type: 'GET_SUB_INFO_SUCCESS', current_abo: response.data.response[0].typeAbo, isValid: response.data.response[0].status});
        } else {
            yield put({ type: GET_SUB_INFO_ERROR });
        }
    } catch (e) {


    }
}

// Get all student of a user
export function* subscribe(datas) {
    const response = yield call(subscribe_api, datas);
    console.log(datas);
    try {
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: 'SNACK_PUT_SUCCESS', message: 'Vous avez un nouvel abonnement !', redirect: true, pathToRedirect: '/dashboard'
            });
            //yield put({type: 'GET_SUB_INFO_SUCCESS', current_abo: response.data.response[0].typeAbo, isValid: response.data.response[0].status});
        } else {
            yield put({
                type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue.'});
        }
    } catch (e) {


    }
}
