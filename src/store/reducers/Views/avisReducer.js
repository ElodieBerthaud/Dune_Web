import initialState from '../../initialState';
import {GET_AVIS_SUCCESS, GET_AVIS_ERROR} from "../../../actions/actionTypes";

export default function getAvis(state = initialState.getAvis, action) {
    switch (action.type) {
        case GET_AVIS_SUCCESS:
            return {...state, error: false, success: true, contentAvis: action.content, nbAvis: action.nbAvis}
        case GET_AVIS_ERROR:
            return {...state, error: true, success: false, contentAvis: null}
        default:
            return state;
    }

}