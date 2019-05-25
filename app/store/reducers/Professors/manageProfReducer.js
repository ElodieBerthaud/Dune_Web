import initialState from '../../initialState';
import {
  ADD_PROFESSOR_REQUEST,
  ADD_PROFESSOR_SUCCESS,
  ADD_PROFESSOR_ERROR
} from '../../../actions/actionTypes';

export default function professor(state = initialState.manageProfessor, action) {
  switch (action.type) {
    case ADD_PROFESSOR_REQUEST:
      return {
        ...state, add: true, update: false, success: null
      };
    case ADD_PROFESSOR_SUCCESS:
      return {
        ...state, add: false, update: false, success: true, error: false
      };
    case ADD_PROFESSOR_ERROR:
      return {
        ...state, add: false, update: false, success: false, error: action.error
      };
    default:
      return state;
  }
}
