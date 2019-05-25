import axios from 'axios';


// GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
export function fetchProf(datas) {
  const url = 'http://176.31.252.134:9001/api/v1/users/infos';

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
  const url = `http://176.31.252.134:9001/api/v1/notifs/getArrayProf/${datas.idDemande}`;

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
    url: 'http://176.31.252.134:9001/api/v1/users/add',
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
    url: 'http://176.31.252.134:9001/api/v1/users/update',
    data: datasTosend,
    headers: {
      Accept: 'application/json',
      token: datas.token
    }
  });
}
