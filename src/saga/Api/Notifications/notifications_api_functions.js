import axios from "axios";


//Get nbr of notifications
export function get_nb_notifs_api(datas){

    const url = "http://176.31.252.134:7001/api/v1/notifs/getNbNotifs";

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}



//Get the list of all notification (Just for the user who is connected)
export function get_all_notifs_api(datas){

    const url = "http://176.31.252.134:7001/api/v1/notifs/popUpMenu";

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}


//Get the content of a notification (IdApp, Game Name, ...)
export function get_a_notif_api(datas){

    const url = "http://176.31.252.134:7001/api/v1/notifs/getNotif/" + datas.idNotif;

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}


//Accept an app ask from the notification panel (Only for directors)
export function validate_app_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('idDemande', datas.idDemande);
    datasTosend.append('validate', datas.validate);

    const url = "http://176.31.252.134:7001/api/v1/store/validating";

    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        },
        data: datasTosend
    });
}


//Set a notification as READ
export function read_notif_api(datas){

    const url = "http://176.31.252.134:7001/api/v1/notifs/read/" + datas.idNotif;

    return axios({
        method: 'put',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}




