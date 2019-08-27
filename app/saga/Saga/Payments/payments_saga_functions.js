import { put, call } from 'redux-saga/es/effects';
import {
    ACCESS_PAYMENT_INFOS_SUCCESS, ADD_PROFESSOR_ERROR
} from '../../../actions/actionTypes';
import { verify_password } from '../../Api/Payments/payments_api_function';


// Update a professor's informations
export function* access_facturation(datas) {
    console.log("COUCOU");
    try {
        const response = yield call(verify_password, datas);

        if (response.data.status === 200) {

            yield put({ type: ACCESS_PAYMENT_INFOS_SUCCESS });

        } else {
            if (response.data.response === "Invalid Password"){
                yield put({ type: 'SNACK_PUT_ERROR', message: 'Erreur. Le mot de passe n\'est pas valide.' });
            }
        }
    } catch (e) {

    }
}

export function* request_iban(datas){
    console.log(datas);
    return;
}
