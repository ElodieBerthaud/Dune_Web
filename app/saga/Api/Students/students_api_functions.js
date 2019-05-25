import axios from 'axios';


// Get all students from a request with filter (from a classe or from all the school)
export function get_all_students_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idClasse', datas.idClasse);

  datas.search = datas.search == undefined ? '' : datas.search;

  datasTosend.append('search', datas.search);

  const url = datas.idClasse == 0 ? 'http://176.31.252.134:9001/api/v1/trombi/' : 'http://176.31.252.134:9001/api/v1/trombi/byClasse';

  return axios({
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: datas.token
    },
    data: datasTosend
  });
}


// Get nbr of students of a professors (Or director). Usefull for printing in dashboard.
export function get_nbr_students_api(datas) {
  const url = 'http://176.31.252.134:9001/api/v1/dashboard/nbEleves';

  return axios({
    method: 'get',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: datas.token
    }
  });
}


// Get all informations of a student. (By id)
export function student_profile_api(datas) {
  return axios({
    method: 'get',
    url: `http://176.31.252.134:9001/api/v1/eleves/${datas.id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
  });
}


// Add a student into a class
export function add_student_api(datas) {
  const url = 'http://176.31.252.134:9001/api/v1/eleves/add';

  const datasTosend = new FormData();
  datasTosend.append('directorId', datas.directorId);
  datasTosend.append('nom', datas.nom);
  datasTosend.append('prenom', datas.prenom);
  datasTosend.append('picEleve', datas.picEleve);
  datasTosend.append('idClasse', datas.idClasse);
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

// Get results of a student
export function get_student_results_api(datas) {
  const url = `http://176.31.252.134:9001/api/v1/eleves/stats/bulletin/${datas.idEleve}`;

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

// Update infos os a stusent
export function update_student_api(datas) {
  const datasTosend = new FormData();
  datasTosend.append('idEleve', datas.id);
  datasTosend.append('nomEleve', datas.nom);
  datasTosend.append('prenomEleve', datas.prenom);


  const url = 'http://176.31.252.134:9001/api/v1/eleves/update/';

  return axios({
    method: 'put',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: datas.token
    },
    data: datasTosend
  });
}
