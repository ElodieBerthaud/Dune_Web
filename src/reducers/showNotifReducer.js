import initialState from './initialState';
import {SHOW_NOTIF_SUCCESS, SHOW_NOTIF_ERROR, NOTIFS_DASH_STOP, SHOW_NOTIF_RESET} from "../actions/actionTypes";

export default function showNotif(state = initialState.showNotif, action) {
    switch (action.type) {
        case NOTIFS_DASH_STOP:
            return {...state, showDash: false}
        case SHOW_NOTIF_SUCCESS:
            return { ...state,  success: true, error: false, contentProf: action.contentProf, nomApp: action.nomApp, idApp: action.idApp, typeNotif: action.typeNotif, idNotif: action.idNotif, idDemande: action.idDemande, isAccepted: action.isAccepted, show: true};
        case SHOW_NOTIF_ERROR:
            return { ...state,  success: false, error: true};
        case SHOW_NOTIF_RESET:
            return {... state, show: false};
        default:
            return state;
    }

}