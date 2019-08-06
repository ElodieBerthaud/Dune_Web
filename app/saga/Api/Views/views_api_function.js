import axios from 'axios';
import API_URL_DEV from '../config';

// Add an view (comment + mark /5) on an app's page
export function add_avis_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idGame', datas.idGame);
  datasTosend.append('note', datas.note);
  datasTosend.append('commentaire', datas.commentaire);

  const url = 'http://'+api_url_dev+'/api/v1/store/addAvis';

  return axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}


// Get views of an app
export function get_avis_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idApp', datas.idGame);
  datasTosend.append('depart', datas.depart);
  datasTosend.append('nbRes', 5);

  const url = 'http://'+api_url_dev+'/api/v1/store/avis';

  return axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}


// Get nbr of view of an app (Average of all marks)
export function get_nbr_avis_api(datas) {
  const url = 'http://'+api_url_dev+'/api/v1/store/nbAvis/'+datas.idGame;

  return axios({
    method: 'get',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}
