import axios from 'axios';
import API_URL_DEV from '../config';

export function get_gamesnbr_api(datas) {
  return axios({
    method: 'get',
    url: api_url_dev+'/dashboard/nbGamesPlayed',
    headers: {
      token: datas.token
    }
  });
}

export function get_rank_api(datas) {
  return axios({
    method: 'get',
    url: api_url_dev+'/eleves/stats/getElevesRank',
    headers: {
      token: datas.token
    }
  });
}

export function get_classAgv_api(datas) {
  return axios({
    method: 'get',
    url: api_url_dev+'/eleves/stats/getClassesAvg',
    headers: {
      token: datas.token
    }
  });
}
