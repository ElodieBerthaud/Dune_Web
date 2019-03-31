import { put, call } from "redux-saga/es/effects";
import {get_nb_notifs_api, get_all_notifs_api, get_a_notif_api, validate_app_api, read_notif_api} from '../../Api/Notifications/notifications_api_functions';
import {fetchProfNotif} from "../../Api/Professor/professor_api_functions";
import {get_app_api} from "../../Api/Store/store_api_functions";

//Get nb notif and all notifs
export function* getNotifs(datas){

    try{

        const response = yield call(get_nb_notifs_api, datas);

        const response2 = yield call(get_all_notifs_api, datas);

        if (response.data.status === 200 && response2.data.status === 200){

            const nbNotif = response.data.nb;
            const content = response2.data.response;

            yield put({type: "GET_NOTIFS_SUCCESS", nbNotif: nbNotif, content: content });

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{
        }

    }catch (e) {
    }

}


//Get all infos about one notification
export function* showNotif(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });


    try{

        const responseNotif = yield call(get_a_notif_api, datas);

        if (responseNotif.data.status === 200){


            const typeNotif = responseNotif.data.response[0].typeNotif;

            const idNotif = responseNotif.data.response[0].idNotif;

            const idDemande = responseNotif.data.response[0].idDemande;

            const isAccepted = responseNotif.data.response[0].isAccepted;

            const datasProf = {idDemande: idDemande, token: datas.token};

            const responseProf = yield call(fetchProfNotif, datasProf);

            if (responseProf.data.status === 200){

                const datasApp = {token: datas.token, idApp: responseNotif.data.response[0].idGame};

                const responseApp = yield call(get_app_api, datasApp);

                if (responseApp.data.status === 200) {

                    const nomApp = responseApp.data.response[0].nomApp;

                    const idApp = responseApp.data.response[0].id;

                    yield put({type: "SHOW_NOTIF_SUCCESS", contentProf: responseProf.data.response, nomApp: nomApp, idApp: idApp, typeNotif: typeNotif, idNotif: idNotif, idDemande: idDemande, isAccepted: isAccepted});
                    yield put({type: "END_LOADING"});

                }


            }

        }

    }catch (e) {
        yield put({type: "END_LOADING"});

    }

}


//Accept an app ask
export function* validateApp(datas){

    try{

        const response = yield call(validate_app_api, datas);

        if (response.data.status === 200){

            yield put({type: "SNACK_PUT_SUCCESS", message: "Votre reponse a bien ete prise en compte." });

            const responseRead = yield call(read_notif_api, datas);

            yield put({type: "RELOAD_REQUEST"});

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{
            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });

        }

    }catch (e) {
        yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });
    }

}


//set a notif as READ
export function* readNotif(datas){

    try{

        const response = yield call(read_notif_api, datas);

        if (response.data.status === 200){

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

        }

    }catch (e) {
    }

}


