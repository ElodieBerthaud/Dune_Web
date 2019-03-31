import axios from "axios";


//Upload img for a student or a professor.
export function upload_img_api(datas){

    const datasTosend = new FormData();

    var url = '';

    if (datas.picEleve){

        datasTosend.append('picEleve', datas.file);
        datasTosend.append('idEleve', datas.idEleve);

        url = '/eleves/picEleve';
    }else{

        datasTosend.append('picProf', datas.file);
        datasTosend.append('idUser', datas.idProf);
        datasTosend.append('emailUser', datas.email);

        url = '/users/picProf';
    }

    return axios({
        method: 'put',
        url: 'http://176.31.252.134:7001/api/v1' + url,
        headers: {
            token: datas.token
        },
        data: datasTosend
    });

}