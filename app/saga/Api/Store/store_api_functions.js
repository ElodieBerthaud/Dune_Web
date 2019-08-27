import axios from 'axios';
import API_URL_DEV from '../config';

// Get apps which are available on the store.
export function get_apps_buy(datas) {
  const url = api_url_dev+'/store';

  const datasTosend = new FormData();
  datasTosend.append('idType', '0');
  datasTosend.append('token', datas.token);

  return axios({
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: datasTosend
  });
}


// Get informations about an app (by id)
export function get_app_api(datas) {
  const url = api_url_dev+'/store/getApp';

  const datasTosend = new FormData();
  datasTosend.append('idApp', datas.idApp);
  datasTosend.append('token', datas.token);

  return axios({
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: datasTosend
  });
}


// Get app status (in library, to buy, pending ask)
export function get_appstatus_api(datas) {
  const url = api_url_dev+'/store/getAppStatus/'+datas.idApp;

  return axios({
    method: 'get',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}


// Get all apps in the school's library
export function get_app_registred_api(datas) {
  const url = api_url_dev+'/store/getAppsEcole';

  return axios({
    method: 'get',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}


// Get nbr of apps on the school's library
export function get_app_registrednbr_api(datas) {
  const url = api_url_dev+'/games/nbGames';

  return axios({
    method: 'get',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    }
  });
}


// Ask an app to the director of the school
export function ask_app_api(datas) {
  const url = api_url_dev+'/store/buyApp';

  const datasTosend = new FormData();
  datasTosend.append('idApp', datas.idApp);
  datasTosend.append('commentaire', datas.commentaire);
  datasTosend.append('token', datas.token);

  return axios({
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}


// Buy directly an app (When commected with director's account)
export function buy_app_api(datas) {
  const url = api_url_dev+'/store/buyAppDirecteur';

  const datasTosend = new FormData();
  datasTosend.append('idApp', datas.idApp);

  return axios({
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}
