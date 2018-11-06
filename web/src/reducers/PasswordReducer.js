import initialState from './initialState';
import {CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_ERROR} from "../actions/actionTypes";

export default function password(state = initialState.password, action) {
    switch (action.type) {
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state,  asking: false, success: true, error: false};
        case CHANGE_PASSWORD_REQUEST:
            return { ...state,  asking: true};
        case CHANGE_PASSWORD_ERROR:
            return { ...state,  asking: false, success: false, error: true, errorCode: action.errorCode};
        default:
            return state;
    }

}