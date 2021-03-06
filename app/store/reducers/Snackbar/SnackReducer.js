import initialState from '../../initialState';
import {
  SNACK_PUT_ERROR,
  SNACK_PUT_SUCCESS,
  SNACK_RESET
} from '../../../actions/actionTypes';

export default function snack(state = initialState.snackContent, action) {
  switch (action.type) {
    case SNACK_PUT_ERROR:
      return {
        ...state, error: true, success: false, message: action.message
      };
    case SNACK_PUT_SUCCESS:
      return {
        ...state, success: true, error: false, message: action.message, redirect: action.redirect, pathToRedirect: action.pathToRedirect
      };
    case SNACK_RESET:
      return {
        ...state, error: false, success: false, message: '', redirect: false, pathToRedirect: ''
      };
    default:
      return state;
  }
}
