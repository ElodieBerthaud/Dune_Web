import initialState from '../../initialState';
import {
  GET_APP_REGISTRED_SUCCESS,
  GET_APP_REGISTRED_ERROR,
  GET_APPNBR
} from '../../../actions/actionTypes';

export default function appRegistred(state = initialState.appRegistred, action) {
  switch (action.type) {
    case GET_APP_REGISTRED_SUCCESS:
      return {
        ...state, success: true, error: true, apps: action.apps
      };
    case GET_APP_REGISTRED_ERROR:
      return { ...state, success: false, error: true };
    case GET_APPNBR:
      return { ...state, appsNbr: action.appsNbr };
    default:
      return state;
  }
}
