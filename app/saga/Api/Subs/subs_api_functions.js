import axios from 'axios';
import API_URL_DEV from '../config';

// Get all students from a request with filter (from a classe or from all the school)
export function get_sub_info_api(datas) {

    const url = api_url_dev+'/abonnement/getSub';

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

export function is_valid_sub(datas){
    const url = api_url_dev+'/abonnement/isValid';

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

export function subscribe_api(datas){
    console.log("CALL API");
    const url = api_url_dev+'/abonnement/subscribe';

    return axios({
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        },
        data: {
            plan: datas.plan
        }
    });
}
