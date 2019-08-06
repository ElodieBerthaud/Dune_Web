import initialState from '../../initialState';
import {
    PASS_POPUP_CLOSE,
    PASS_POPUP_OPEN,
    ACCESS_PAYMENT_INFOS_SUCCESS
} from '../../../actions/actionTypes';

export default function payments(state = initialState.payments, action) {
    switch (action.type) {
        case PASS_POPUP_OPEN:
            return { ...state, passPopup: true };
        case PASS_POPUP_CLOSE:
            return { ...state, passPopup: false };
        case ACCESS_PAYMENT_INFOS_SUCCESS:
            return { ...state, access_infos: true }
        default:
            return state;
    }
}
