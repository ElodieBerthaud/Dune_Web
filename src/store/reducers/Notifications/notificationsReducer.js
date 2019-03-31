import initialState from '../../initialState';
import {GET_NOTIFS_SUCCESS, GET_NOTIFS_ERROR} from "../../../actions/actionTypes";

export default function notification(state = initialState.notification, action) {
    switch (action.type) {
        case GET_NOTIFS_SUCCESS:
            return { ...state,  success: true, error: false, content: action.content, nbNotif: action.nbNotif};
        case GET_NOTIFS_ERROR:
            return { ...state,  success: false, error: true};
        default:
            return state;
    }

}