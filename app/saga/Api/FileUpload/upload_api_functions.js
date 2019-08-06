import axios from 'axios';
import API_URL_DEV from '../config';

// Upload img for a student or a professor.
export function upload_img_api(datas) {
  const datasTosend = new FormData();

  let url = '';

  if (datas.picEleve) {
    datasTosend.append('picEleve', datas.file);
    datasTosend.append('idEleve', datas.idEleve);

    url = '/eleves/picEleve';
  } else {
    datasTosend.append('picProf', datas.file);
    datasTosend.append('idUser', datas.idProf);
    datasTosend.append('emailUser', datas.email);

    url = '/users/picProf';
  }

  return axios({
    method: 'put',
    url: 'http://'+api_url_dev+'/api/v1'+url,
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}

export function upload_file_api(datas) {
  const datasTosend = new FormData();

  datasTosend.append('fileName', datas.fileName);
  datasTosend.append('description', datas.description);
  datasTosend.append('private', datas.prive === true ? 1 : 0);
  datasTosend.append('fileUser', datas.fileUser);
  datasTosend.append('fileType', datas.fileType);


  return axios({
    method: 'post',
    url: 'http://'+api_url_dev+'/api/v1/filesManager/uploadFile',
    headers: {
      token: datas.token
    },
    data: datasTosend
  });
}
