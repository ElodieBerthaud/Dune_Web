import initialState from '../../initialState';
import {
    ADD_METHOD_LOADING,
    ADD_METHOD_SUCCESS,
    ADD_METHOD_ERROR
} from '../../../actions/actionTypes';

export default function addPayment(state = initialState.addPayment, action) {
    switch (action.type) {
        case ADD_METHOD_LOADING:
            return { ...state, loading: true, errorMsg: null };
        case ADD_METHOD_SUCCESS:
            return { ...state, loading: false, success: true, error: false, errorMsg: null };
        case ADD_METHOD_ERROR:
            return { ...state, loading: false, success: false, error: true, errorMsg: action.errorMsg };
        default:
            return state;
    }
}
