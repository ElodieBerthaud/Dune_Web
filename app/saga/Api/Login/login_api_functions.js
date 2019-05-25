import axios from 'axios';


// Login via dune API
export function login_in(logs) {
  const datas = new URLSearchParams();
  datas.append('email', logs.email);
  datas.append('password', logs.password);

  return axios({
    method: 'post',
    url: 'http://176.31.252.134:9001/api/v1/login',
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
    url: 'http://176.31.252.134:9001/api/v1/login/reset',
    data: datasTosend
  });
}


// Change password
export function change_pass_api(datas) {
  const url = 'http://176.31.252.134:9001/api/v1/users/changePassword';

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
  const url = 'http://176.31.252.134:9001/api/v1/users/changeEmail';

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
    url: 'http://176.31.252.134:9001/api/v1/tokens/verifyToken',
    data: datasTosend
  });
}
