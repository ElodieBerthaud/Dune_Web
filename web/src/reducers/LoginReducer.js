import initialState from './initialState';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_ERROR, LOGOUT_SUCCESS} from "../actions/actionTypes";

export default function login(state = initialState.login, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state,  logged: true, user_id: action.user_id, token: action.token, director: action.director};
        case LOGIN_ERROR:
            return { ...state, logged: false, user_id: null};
        case LOGOUT_SUCCESS:
            return {...state, logged: false, user_id: null, token: null, director: null}
        case LOGOUT_ERROR:
            return state;
        default:
            return state;
    }

}