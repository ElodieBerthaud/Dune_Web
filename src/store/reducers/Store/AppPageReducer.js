import initialState from '../../initialState';
import {
    GET_APP_SUCCESS,
    GET_APP_ERROR
} from '../../../actions/actionTypes';

export default function appPage(state = initialState.appPage, action) {

    switch (action.type) {
        case GET_APP_SUCCESS:
            return { ...state, success: true, appContent: action.appContent, status: action.status };
        case GET_APP_ERROR:
            return { ...state, error: true, success: false};
        default:
            return state;
    }

}