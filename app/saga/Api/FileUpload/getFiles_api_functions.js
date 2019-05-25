import axios from 'axios';

export function get_files_api(datas) {
  const datasTosend = new FormData();

  datasTosend.append('private', datas.filesPrivate === true ? 1 : 0);
  datasTosend.append('title', datas.title);
  datasTosend.append('type', datas.typeF);
  datasTosend.append('classement', datas.classement);

  return axios({
    method: 'post',
    url: 'http://176.31.252.134:9001/api/v1/filesManager/getAll',
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
    url: 'http://176.31.252.134:9001/api/v1/filesManager/editFile',
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
    url: 'http://176.31.252.134:9001/api/v1/filesManager/deleteFile',
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}
