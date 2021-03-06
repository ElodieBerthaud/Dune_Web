import initialState from '../../initialState';
import {
    ABO_POPUP_CLOSE,
    ABO_POPUP_OPEN,
    GET_SUB_INFO_SUCCESS
} from '../../../actions/actionTypes';

export default function subscribe(state = initialState.subscribe, action) {
    switch (action.type) {
        case ABO_POPUP_OPEN:
            return { ...state, popupOpen: true, popupContent: action.popupContent, popupAboTitle: action.popupAboTitle, aboId: action.id, priceYear: action.priceYear, priceMonth: action.priceMonth };
        case ABO_POPUP_CLOSE:
            return {
                ...state, popupOpen: false, popupContent: null, popupAboTitle: null, aboId: null
            };
        case GET_SUB_INFO_SUCCESS:
            return {
                ...state, current_abo: action.current_abo, isValid: action.isValid, priceMonth: action.priceMonth, priceYear: action.priceYear
            };
        default:
            return state;
    }
}
