import initialState from './initialState';
import {
    GET_APPS_BUY_REQUEST,
    GET_APPS_BUY_SUCCESS,
    GET_APPS_BUY_ERROR
} from '../actions/actionTypes';

export default function storeBuy(state = initialState.storeBuy, action) {

    switch (action.type) {
        case GET_APPS_BUY_REQUEST:
            return { ...state, pending: true };
        case GET_APPS_BUY_SUCCESS:
            return { ...state, pending: false, apps: action.apps, success: true, error: false };
        case GET_APPS_BUY_ERROR:
            return { ...state, asking: false, error: true, success: false, errorCode: action.errorCode };
        default:
            return state;
    }

}