import initialState from './initialState';
import {
    SNACK_PUT_ERROR,
    SNACK_PUT_SUCCESS
} from '../actions/actionTypes';

export default function snack(state = initialState.snackContent, action) {

    switch (action.type) {
        case SNACK_PUT_ERROR:
            console.log(action.message);
            return { ...state, error: true, success: false, message: action.message };
        case SNACK_PUT_SUCCESS:
            return { ...state, success: true, error: false, message: action.message };
        default:
            return state;
    }

}