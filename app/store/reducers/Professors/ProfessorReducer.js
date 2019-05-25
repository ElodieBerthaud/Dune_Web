import initialState from '../../initialState';
import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
} from '../../../actions/actionTypes';

export default function professor(state = initialState.professor, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return {
        ...state, fetching: false, nomProf: action.nomProf, prenomProf: action.prenomProf, emailProf: action.emailProf
      };
    case API_CALL_FAILURE:
      return {
        ...state, fetching: false, nomProf: null, prenomProf: null, emailProf: null, error: action.error
      };
    default:
      return state;
  }
}
