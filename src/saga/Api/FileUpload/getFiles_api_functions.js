import axios from "axios";

export function get_files_api(datas){

    const datasTosend = new FormData();

    datasTosend.append('private', 0);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:7001/api/v1/filesManager/getAll',
        headers: {
            token: datas.token
        },
        data: datasTosend
    });

}