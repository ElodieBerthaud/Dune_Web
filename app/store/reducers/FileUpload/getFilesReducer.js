import initialState from '../../initialState';
import { GET_FILES_ERROR, GET_FILES_SUCCESS } from '../../../actions/actionTypes';

export default function login(state = initialState.files, action) {
  switch (action.type) {
    case GET_FILES_SUCCESS:
      return {
        ...state, success: true, error: false, files: action.files
      };
    case GET_FILES_ERROR:
      return { ...state, error: true, success: false };
    default:
      return state;
  }
}
