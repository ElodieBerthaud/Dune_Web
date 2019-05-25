import initialState from '../../initialState';
import {
  RELOAD_REQUEST,
  STOP_RELOAD
} from '../../../actions/actionTypes';

export default function reload(state = initialState.reload, action) {
  switch (action.type) {
    case RELOAD_REQUEST:
      return { ...state, status: true };
    case STOP_RELOAD:
      return { ...state, status: false };
    default:
      return state;
  }
}
