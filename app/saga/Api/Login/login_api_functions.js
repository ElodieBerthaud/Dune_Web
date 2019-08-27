import axios from 'axios';
import API_URL_DEV from '../config.js';

// Login via dune API
export function login_in(logs) {
  console.log(api_url_dev);
  const datas = new URLSearchParams();
  datas.append('email', logs.email);
  datas.append('password', logs.password);

  return axios({
    method: 'post',
    url: api_url_dev+'/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: datas
  });
}

// Forgot password at login
export function forgot_password_api(datas) {
  const datasTosend = new URLSearchParams();
  datasTosend.append('email', datas.email);


  return axios({
    method: 'post',
    url: api_url_dev+'/login/reset',
    data: datasTosend
  });
}


// Change password
export function change_pass_api(datas) {
  const url = api_url_dev+'/users/changePassword';

  const datasTosend = new FormData();
  datasTosend.append('idUser', datas.idUser);
  datasTosend.append('oldPassword', datas.oldPassword);
  datasTosend.append('newPassword', datas.newPassword);
  datasTosend.append('token', datas.token);

  return axios({
    method: 'put',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: datasTosend
  });
}


// Change connexion's Email
export function change_ident_api(datas) {
  const url = api_url_dev+'/users/changeEmail';

  const datasTosend = new FormData();
  datasTosend.append('idUser', datas.idUser);
  datasTosend.append('password', datas.password);
  datasTosend.append('newEmail', datas.newEmail);
  datasTosend.append('token', datas.token);

  return axios({
    method: 'put',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: datasTosend
  });
}

// Verify if token os still good
export function verify_token_api(datas) {
  const datasTosend = new URLSearchParams();
  datasTosend.append('token', datas.token);

  return axios({
    method: 'post',
    url: api_url_dev+'/tokens/verifyToken',
    data: datasTosend
  });
}
