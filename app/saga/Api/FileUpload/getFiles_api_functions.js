import axios from 'axios';
import API_URL_DEV from '../config';

export function get_files_api(datas) {
  const datasTosend = new FormData();

  datasTosend.append('private', datas.filesPrivate === true ? 1 : 0);
  datasTosend.append('title', datas.title);
  datasTosend.append('type', datas.typeF);
  datasTosend.append('classement', datas.classement);

  return axios({
    method: 'post',
    url: api_url_dev+'/filesManager/getAll',
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}

export function update_files_api(datas) {
  const datasTosend = new FormData();

  datasTosend.append('nomFile', datas.newTitle);
  datasTosend.append('description', datas.newDesc);
  datasTosend.append('private', datas.privateF === true ? 1 : 0);
  datasTosend.append('idFile', datas.idFile);

  return axios({
    method: 'put',
    url: api_url_dev+'/filesManager/editFile',
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}

export function delete_file_api(datas) {
  const datasTosend = new FormData();

  datasTosend.append('idFile', datas.idFile);


  return axios({
    method: 'delete',
    url: api_url_dev+'/filesManager/deleteFile',
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}
