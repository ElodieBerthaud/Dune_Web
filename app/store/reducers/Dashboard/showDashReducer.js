import initialState from '../../initialState';
import { NOTIFS_DASH_STOP } from '../../../actions/actionTypes';

export default function showNotif(state = initialState.showDash, action) {
  switch (action.type) {
    case NOTIFS_DASH_STOP:
      return { ...state, showDash: false };
    default:
      return state;
  }
}
