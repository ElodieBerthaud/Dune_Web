import axios from 'axios';
import API_URL_DEV from '../config';

export function get_gamesnbr_api(datas) {
  return axios({
    method: 'get',
    url: 'http://'+api_url_dev+'/api/v1/dashboard/nbGamesPlayed',
    headers: {
      token: datas.token
    }
  });
}

export function get_rank_api(datas) {
  return axios({
    method: 'get',
    url: 'http://'+api_url_dev+'/api/v1/eleves/stats/getElevesRank',
    headers: {
      token: datas.token
    }
  });
}

export function get_classAgv_api(datas) {
  return axios({
    method: 'get',
    url: 'http://'+api_url_dev+'/api/v1/eleves/stats/getClassesAvg',
    headers: {
      token: datas.token
    }
  });
}
