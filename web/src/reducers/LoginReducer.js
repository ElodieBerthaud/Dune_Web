import initialState from './initialState';
import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_ERROR, LOGOUT_SUCCESS, TOKEN_UNVALID} from "../actions/actionTypes";

export default function login(state = initialState.login, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state,  logged: true, id_user: action.user_id, token: action.token, director: action.director, tokenUnValid: false};
        case LOGIN_ERROR:
            return { ...state, logged: false, user_id: null, token: null};
        case LOGOUT_SUCCESS:
            return {...state, logged: false, user_id: null, token: null, director: null}
        case LOGOUT_ERROR:
            return state;
        case TOKEN_UNVALID:
            return { ...state, tokenUnValid: true};
        default:
            return state;
    }

}