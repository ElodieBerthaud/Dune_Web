import initialState from '../../initialState';
import {
    SNACK_PUT_ERROR,
    SNACK_PUT_SUCCESS,
    SNACK_RESET,
    RELOAD_PAGE,
    STOP_RELOAD
} from '../../../actions/actionTypes';

export default function snack(state = initialState.snackContent, action) {

    switch (action.type) {
        case SNACK_PUT_ERROR:
            return { ...state, error: true, success: false, message: action.message };
        case SNACK_PUT_SUCCESS:
            return { ...state, success: true, error: false, message: action.message };
        case SNACK_RESET:
            return { ...state, success: false, error: false, message: action.message };
        case RELOAD_PAGE:
            return {...state, success: null, error: null, message: '', reload: true};
        case STOP_RELOAD:
            return {...state, success: null, error: null, message: '', reload: false};
        default:
            return state;
    }

}