import initialState from '../../initialState';
import { OPEN_DRAWER_SUCCESS, CLOSE_DRAWER_SUCCESS } from '../../../actions/actionTypes';

export default function drawer(state = initialState.drawer, action) {
  switch (action.type) {
    case OPEN_DRAWER_SUCCESS:
      return { ...state, opened: true };
    case CLOSE_DRAWER_SUCCESS:
      return { ...state, opened: false };
    default:
      return state;
  }
}
