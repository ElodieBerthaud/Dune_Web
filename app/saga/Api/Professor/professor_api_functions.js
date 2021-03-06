import axios from 'axios';
import API_URL_DEV from '../config';

// GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
export function fetchProf(datas) {
  const url = api_url_dev+'/users/infos';

  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: datas.token
    }
  });
}

// Get prof infos only for notifications
export function fetchProfNotif(datas) {
  const url = api_url_dev+'/notifs/getArrayProf/'+datas.idDemande;

  return axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: datas.token
    }
  });
}


// ADD PROF FROM API
export function add_professor_api(datas) {
  const data = new URLSearchParams();
  data.append('nom', datas.surname);
  data.append('prenom', datas.name);
  data.append('email', datas.email);

  return axios({
    method: 'post',
    url: api_url_dev+'/users/add',
    data,
    headers: {
      Accept: 'application/json',
      token: datas.token
    }
  });
}


// Update prof informations
export function update_prof_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('nomUser', datas.nomProf);
  datasTosend.append('prenomUser', datas.prenomProf);

  return axios({
    method: 'put',
    url: api_url_dev+'/users/update',
    data: datasTosend,
    headers: {
      Accept: 'application/json',
      token: datas.token
    }
  });
}
