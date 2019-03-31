import initialState from '../../initialState';
import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_ERROR, LOGOUT_SUCCESS, TOKEN_UNVALID} from '../../../actions/actionTypes';

export default function login(state = initialState.login, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state,  logged: true, token: action.token, director: action.director, tokenUnValid: false, typeUser: action.typeUser };
        case LOGIN_ERROR:
            return { ...state, logged: false, id_user: null, token: null};
        case LOGOUT_SUCCESS:
            return {...state, logged: false, id_user: null, token: null, director: null}
        case LOGOUT_ERROR:
            return state;
        case TOKEN_UNVALID:
            return { ...state, tokenUnValid: true};
        default:
            return state;
    }

}