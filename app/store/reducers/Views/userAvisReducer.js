import initialState from '../../initialState';
import { GET_USERAVIS_SUCCESS } from '../../../actions/actionTypes';

export default function userAvis(state = initialState.userAvis, action) {
    switch (action.type) {
        case GET_USERAVIS_SUCCESS:
            return {
                ...state, avis: action.avis, note: action.note, commentaire: action.commentaire
            };
        default:
            return state;
    }
}
