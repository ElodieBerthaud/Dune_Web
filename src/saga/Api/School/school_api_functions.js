import axios from "axios";


//Get all classes of a professor.
export function get_user_classes_api(datas) {

    const datasTosend = new FormData();

    return axios({
        method: 'get',
        url: 'http://176.31.252.134:7001/api/v1/trombi/classes',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });
}