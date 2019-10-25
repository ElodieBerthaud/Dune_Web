import { put, call } from 'redux-saga/es/effects';
import {
    ACCESS_PAYMENT_INFOS_SUCCESS, ADD_METHOD_LOADING
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
    console.log("AJOUT DU PAIEMENT...");
    const response = yield call(send_payment_method, datas);
    yield put({ type: 'ADD_METHOD_LOADING'});

try {
        const api = yield call(sendToken, {tokenSession: datas.tokenSession, pm_id: response.paymentMethod.id});
        console.log(api);
        try {
            if (api.data.status === 500){
                let errorMsg = null;
                console.log(api.data.error.code);
                switch (api.data.error.code) {
                    case 'card_declined':
                        errorMsg = 'Votre carte a été refusée.';
                        break;
                    case 'expired_card':
                        errorMsg = 'Votre carte a expiré.';
                        break;
                    case 'incorrect_number':
                    case 'invalid_number':
                        errorMsg = 'le numero de votre carte est incorrect.';
                        break;
                    case 'incorrect_cvc':
                    case 'invalid_cvc':
                        errorMsg = 'Votre CVC est incorrect';
                        break;
                    case 'insufficient_funds':
                        errorMsg = 'Votre carte a été refusée car vus ne possédez pas les fonds suffisants.'
                        break;
                }
                yield put({ type: 'ADD_METHOD_ERROR', errorMsg: errorMsg});
            } else {
                yield put({
                    type: 'SNACK_PUT_SUCCESS', message: 'Votre moyen de paiement a bien été enregistré.', redirect: false});
                yield put({ type: 'ADD_METHOD_SUCCESS'});
            }
        } catch (e) {
            yield put({ type: 'ADD_METHOD_ERROR', errorMsg: 'Une erreur est survenue.'});
            yield put({ type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue lors de l\'ajout du moyen de paiement.' });
        }

    } catch (e){
    yield put({ type: 'ADD_METHOD_ERROR', errorMsg: 'Une erreur est survenue.'});
    yield put({ type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue lors de l\'ajout du moyen de paiement.' });
    }
}
