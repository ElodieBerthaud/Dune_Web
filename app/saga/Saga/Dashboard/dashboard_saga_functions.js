import { put, call } from 'redux-saga/es/effects';
import { get_gamesnbr_api, get_rank_api, get_classAgv_api } from '../../Api/Dashboard/dashboard_api_functions';
import { GET_DASHBOARD_SUCCESS } from '../../../actions/actionTypes';

export function* get_gamesnbr(datas) {
  yield put({ type: 'LOADING', loadmessage: 'Veuillez patienter.' });

  try {
    const response = yield call(get_gamesnbr_api, datas);

    if (response.data.status === 200) {
      const response2 = yield call(get_rank_api, datas);

      if (response2.data.status === 200) {
        const response3 = yield call(get_classAgv_api, datas);

        if (response3.data.status === 200) {
          yield put({
            type: GET_DASHBOARD_SUCCESS,
            GamesPlayed: response.data.nbGamesPlayed,
            rank: response2.data.response,
            classesAvg: response3.data.response
          });
          yield put({ type: 'END_LOADING' });
        }
      }
    }
  } catch (e) {
  }
}
