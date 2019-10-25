import axios from 'axios';

export function help_api(datas) {
    const datasTosend = new FormData();

    datasTosend.append('pbType', datas.probleme);
    datasTosend.append('pbDetail', datas.message);

    return axios({
        method: 'post',
        url: api_url_dev+'/help/contact',
        headers: {
            token: datas.token
        },
        data: datasTosend
    });
}
