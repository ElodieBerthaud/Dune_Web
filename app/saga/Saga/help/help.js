import { put, call } from 'redux-saga/es/effects';
import {
    SNACK_PUT_SUCCESS, SNACK_PUT_ERROR
} from '../../../actions/actionTypes';
import { help_api } from '../../Api/help/help_api';

// open image viewer
export function* help(datas) {
    console.log(datas);
    try {
        yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

        const response = yield call(help_api, datas);

        if (response.data.status === 200) {
            yield put({ type: 'SNACK_PUT_SUCCESS', message: 'Votre message a bien été envoyé', redirect: true, pathToRedirect: '/dashboard'});

            yield put({ type: 'END_LOADING' });
        } else {
            yield put({ type: 'SNACK_PUT_ERROR', message: 'Une erreur est survenue. Vérifiez les champs du formulaire ou réessayez plus tard.'});
            yield put({ type: 'END_LOADING' });
        }
    } catch {
        yield put({ type: 'SNACK_PUT_ERROR', message: 'Votre message a bien été envoyé', redirect: true, pathToRedirect: '/dashboard'});
        yield put({ type: 'END_LOADING' });
    }
}
