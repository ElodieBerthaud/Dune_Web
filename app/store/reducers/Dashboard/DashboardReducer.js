import initialState from '../../initialState';
import { GET_DASHBOARD_SUCCESS } from '../../../actions/actionTypes';

export default function dashboard(state = initialState.dashboard, action) {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state, GamesPlayed: action.GamesPlayed, rank: action.rank, classesAvg: action.classesAvg
      };
    default:
      return state;
  }
}
