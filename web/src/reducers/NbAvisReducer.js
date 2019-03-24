import initialState from './initialState';
import {GET_NB_AVIS_ERROR, GET_NB_AVIS_SUCCESS, GET_LAST_AVIS_NBR} from "../actions/actionTypes";

export default function notification(state = initialState.nbAvis, action) {
    switch (action.type) {
        case GET_NB_AVIS_SUCCESS:
            return { ...state, moyenne: action.moyenne, error: false, success: true};
        case GET_NB_AVIS_ERROR:
            return { ...state,  success: false, error: true};
        case GET_LAST_AVIS_NBR:
            return {...state, lastNbAvis: action.lastNbAvis}
        default:
            return state;
    }

}