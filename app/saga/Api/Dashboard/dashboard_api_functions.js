import axios from 'axios';

export function get_gamesnbr_api(datas) {
  return axios({
    method: 'get',
    url: 'http://176.31.252.134:9001/api/v1/dashboard/nbGamesPlayed',
    headers: {
      token: datas.token
    }
  });
}

export function get_rank_api(datas) {
  return axios({
    method: 'get',
    url: 'http://176.31.252.134:9001/api/v1/eleves/stats/getElevesRank',
    headers: {
      token: datas.token
    }
  });
}

export function get_classAgv_api(datas) {
  return axios({
    method: 'get',
    url: 'http://176.31.252.134:9001/api/v1/eleves/stats/getClassesAvg',
    headers: {
      token: datas.token
    }
  });
}
