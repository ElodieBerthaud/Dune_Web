import initialState from '../../initialState';
import { SHOW_DASH_TMP_STOP } from '../../../actions/actionTypes';

export default function showNotif(state = initialState.showDashTmp, action) {
  switch (action.type) {
    case SHOW_DASH_TMP_STOP:
      return { ...state, showDash: false };
    default:
      return state;
  }
}
