import { put, call } from 'redux-saga/es/effects';
import {
    ACCESS_PAYMENT_INFOS_SUCCESS
} from '../../../actions/actionTypes';
import { verify_password, send_payment_method, sendToken } from '../../Api/Payments/payments_api_function';


// Update a professor's informations
export function* access_facturation(datas) {
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

export function* addPaymentMethod(datas)
{
    const response = yield call(send_payment_method, datas);

    try {
        const api = yield call(sendToken, {tokenSession: datas.tokenSession, pm_id: response.paymentMethod.id});

        try {
            yield put({
                type: 'SNACK_PUT_SUCCESS', message: 'Votre moyen de paiement a bien été enregistré.', redirect: false});
        } catch (e) {
            yield put({ type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue lors de l\'ajout du moyen de paiement.' });
        }

    } catch (e){
        yield put({ type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue lors de l\'ajout du moyen de paiement.' });
    }
}
