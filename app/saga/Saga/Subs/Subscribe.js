import { put, call } from 'redux-saga/es/effects';
import {
    get_sub_info_api,
    is_valid_sub
} from '../../Api/Subs/subs_api_functions';

// Get all student of a user
export function* get_sub_infos(datas) {
    try {
        const response = yield call(get_sub_info_api, datas);

        if (response.status === 200) {
            const response2 = yield call(is_valid_sub, datas);
            if (response2.data.response === "OK") {
                yield put({type: 'GET_SUB_INFO_SUCCESS', abo: response.data.response[0].typeAbo, valid: null});
            }
        } else {
            yield put({ type: GET_SUB_INFO_ERROR });
        }
    } catch (e) {


    }
}
