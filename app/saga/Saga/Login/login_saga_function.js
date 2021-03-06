import { put, call } from 'redux-saga/es/effects';
import {
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  SNACK_PUT_ERROR,
  SNACK_PUT_SUCCESS, TOKEN_UNVALID
} from '../../../actions/actionTypes';
import {
  login_in, forgot_password_api, change_pass_api, change_ident_api, verify_token_api
} from '../../Api/Login/login_api_functions';
import { fetchProf } from '../../Api/Professor/professor_api_functions';

// Login the user
export function* login(logs) {
  const datas = {
    email: logs.email,
    password: logs.pass
  };

  try {
    const response = yield call(login_in, datas);
    if (response.data.success === true) {
      const token = response.data.token;
      const user_id = response.data.currUser;
      const director = response.data.typeUser !== 1;
      const typeUser = response.data.typeUser;
      const idEcole = response.data.idEcole;
      const tutorial = response.data.status === 201;
      yield put({
        type: 'LOGIN_SUCCESS', token, director, typeUser, idUser: user_id, tutorial: tutorial
      });
      yield put({ type: 'GET_NOTIFS_REQUEST', idUser: user_id, token });

      const datas_2 = {
        token,
        id: user_id
      };

      const response_2 = yield call(fetchProf, datas_2);

      if (response_2.data.status === 200) {
        const lastname = response_2.data.response[0].nomUser;
        const name = response_2.data.response[0].prenomUser;
        const email = response_2.data.response[0].emailUser;
        const pic = response_2.data.response[0].picPath;

        yield put({
          type: 'GET_USER_INFOS', lastname, name, email, pic
        });
      }
    } else {
      yield put({ type: 'SNACK_PUT_ERROR', message: response.data.response });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: 'SNACK_PUT_ERROR', message: "Une erreur s'est produite." });
    yield put({ type: 'LOGIN_ERROR', e });
  }
}


// Logout the user
export function* logout() {
  try {
    yield put({ type: 'LOGOUT_SUCCESS' });
  } catch (e) {
    yield put({ type: 'LOGOUT_ERROR' });
  }
}


// Change user's password (FORGOT)
export function* change_password(datas) {
  try {
    const response = yield call(forgot_password_api, datas);

    if (response.data.status === 200) {
      yield put({ type: CHANGE_PASSWORD_SUCCESS });

      yield put({ type: SNACK_PUT_SUCCESS, message: 'Votre mot de passe vient de vous etre envoye par mail.' });
    } else {
      const error = response.data.status;

      yield put({ type: CHANGE_PASSWORD_ERROR, errorCode: error });

      if (error === 502) {
        yield put({ type: SNACK_PUT_ERROR, message: 'Erreur. Aucun compte n\'est lie a cette Email.' });
      }
    }
  } catch (e) {
    yield put({ type: CHANGE_PASSWORD_ERROR });
  }
}

// Verify if token is still valid
export function* verifyToken(datas) {
  try {
    const response = yield call(verify_token_api, datas);

    if (response.data.name === 'JsonWebTokenError') {
      yield put({ type: TOKEN_UNVALID });
    }
  } catch (e) {

  }
}


// Change user's email
export function* changeIdentifiant(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(change_ident_api, datas);

    if (response.data.status === 200) {
      yield put({ type: 'END_LOADING' });

      yield put({
        type: 'SNACK_PUT_SUCCESS', message: `Votre identifiant a bien ete change a ${datas.newEmail}`, redirect: true, pathToRedirect: '/account'
      });
    }
    // Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
    else if (response.data.status === 500) {
      yield put({ type: 'END_LOADING' });

      yield put({ type: 'SNACK_PUT_ERROR', message: 'Erreur. Mot de passe invalide.' });
    }
  } catch (e) {

  }
}


// Change user's pass
export function* changePass(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(change_pass_api, datas);

    if (response.data.status === 200) {
      yield put({ type: 'END_LOADING' });

      yield put({
        type: 'SNACK_PUT_SUCCESS', message: 'Votre mot de passe a bien ete change. Vous allez etre deconnecte', redirect: true, pathToRedirect: '/login'
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
