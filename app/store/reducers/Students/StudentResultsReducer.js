import initialState from '../../initialState';
import {
  STUDENT_RESULTS_SUCCESS,
  STUDENT_RESULTS_ERROR
} from '../../../actions/actionTypes';

export default function students(state = initialState.studentResults, action) {
  switch (action.type) {
    case STUDENT_RESULTS_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        moyenneClasse: action.moyenneClasse,
        moyenneG: action.moyenneG,
        content: action.content
      };
    case STUDENT_RESULTS_ERROR:
      return { ...state, success: false, error: true };
    default:
      return state;
  }
}
