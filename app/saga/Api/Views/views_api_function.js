import axios from 'axios';
import API_URL_DEV from '../config';

// Add an view (comment + mark /5) on an app's page
export function add_avis_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idGame', datas.idGame);
  datasTosend.append('note', datas.note);
  datasTosend.append('commentaire', datas.commentaire);

  const url = api_url_dev+'/store/addAvis';

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

  const url = api_url_dev+'/store/avis';

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
  const url = api_url_dev+'/store/nbAvis/'+datas.idGame;

  return axios({
    method: 'get',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}

// Get view of a user on an app
export function get_user_view_api(datas) {
  const url = api_url_dev+'/store/getUserAvis/'+datas.idGame;

  return axios({
    method: 'get',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}

// Update the view of a user on an app
export function update_user_view_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idApp', datas.idGame);
  datasTosend.append('note', datas.note);
  datasTosend.append('commentaire', datas.commentaire);

  const url = api_url_dev+'/store/updateUserAvis';

  return axios({
    method: 'put',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}
