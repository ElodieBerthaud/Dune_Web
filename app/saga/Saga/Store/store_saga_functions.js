import { put, call } from 'redux-saga/es/effects';
import {
  get_apps_buy, get_app_api, get_appstatus_api, get_app_registred_api, get_app_registrednbr_api, ask_app_api, buy_app_api
} from '../../Api/Store/store_api_functions';

// Get apps availables in the store
export function* getAppsBuy(datas) {
  try {
    const response = yield call(get_apps_buy, datas);

    if (response.data.status === 200) {
      const apps = JSON.stringify(response.data.response);

      yield put({ type: 'GET_APPS_BUY_SUCCESS', apps });
    }
  } catch (e) {

  }
}


// Get infos of an app
export function* getApp(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(get_app_api, datas);

    const responseStatus = yield call(get_appstatus_api, datas);


    if (response.data.status === 200) {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'GET_APP_SUCCESS', appContent: response.data.response[0], status: responseStatus.data.appStatus });
    }
    // Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
    else {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'SNACK_PUT_ERROR', message: "Une erreur s'est produite." });
    }
  } catch (e) {
  }
}


// get all app of the school
export function* getAppRegistred(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(get_app_registred_api, datas);

    if (response.data.status === 200) {
      const apps = JSON.stringify(response.data.response);

      yield put({ type: 'END_LOADING' });

      yield put({ type: 'GET_APP_REGISTRED_SUCCESS', apps });
    }
    // Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
    else {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'SNACK_PUT_ERROR', message: "Une erreur s'est produite." });
    }
  } catch (e) {

  }
}


// get nbr of school's apps
export function* getAppRegistredNbr(datas) {
  try {
    const response = yield call(get_app_registrednbr_api, datas);

    if (response.data.status === 200) {
      const appsNbr = response.data.response[0].nbGames;

      yield put({ type: 'GET_APPNBR', appsNbr });
    } else {
    }
  } catch (e) {

  }
}


// Request an app to the director
export function* askApp(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(ask_app_api, datas);

    if (response.data.status === 200) {
      const apps = JSON.stringify(response.data.response);

      yield put({ type: 'END_LOADING' });

      yield put({ type: 'GET_APP_REGISTRED_SUCCESS', apps });

      yield put({
        type: 'SNACK_PUT_SUCCESS', message: 'La demande a bien ete effectuee.', redirect: true, pathToRedirect: '/store'
      });
    }
    // Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
    else {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'SNACK_PUT_ERROR', message: "Une erreur s'est produite." });
    }
  } catch (e) {
  }
}


// Buy directly an app as director
export function* buyApp(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(buy_app_api, datas);

    if (response.data.status === 200) {
      const apps = JSON.stringify(response.data.response);

      yield put({ type: 'END_LOADING' });

      yield put({ type: 'GET_APP_REGISTRED_SUCCESS', apps });

      yield put({
        type: 'SNACK_PUT_SUCCESS', message: 'La demande a bien ete effectuee.', redirect: true, pathToRedirect: '/store'
      });

      yield put({ type: 'RELOAD_REQUEST' });
    }
    // Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
    else {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'SNACK_PUT_ERROR', message: "Une erreur s'est produite." });
    }
  } catch (e) {
  }
}
