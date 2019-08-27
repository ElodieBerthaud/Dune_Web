import axios from 'axios';
import API_URL_DEV from '../config';

// Get all classes of a professor.
export function get_user_classes_api(datas) {
  const datasTosend = new FormData();

  return axios({
    method: 'get',
    url: api_url_dev+'/trombi/classes',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: datas.token
    }
  });
}
