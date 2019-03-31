import { put, call } from "redux-saga/es/effects";
import {add_avis_api, get_avis_api, get_nbr_avis_api} from '../../Api/Views/views_api_function';

//add a view on an app
export function* addAvis(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(add_avis_api, datas);

        if (response.data.status === 200){


            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Votre avis a bien ete ajoute." });

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{
            yield put({type: "END_LOADING"});

        }

    }catch (e) {

        yield put({type: "END_LOADING"});

        yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });

    }

}


//Get views of an app
export function* getAvis(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(get_avis_api, datas);

        const response2 = yield call(get_nbr_avis_api, datas);

        if (response.data.status === 200 && response2.data.status === 200){

            yield put({type: "GET_LAST_AVIS_NBR", lastNbAvis: Object.keys(response.data.response).length + datas.depart });

            yield put({type: "END_LOADING"});

            yield put({type: "GET_AVIS_SUCCESS", content: response.data.response, nbAvis: response2.data.response[0].nbAvis });

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{
            //yield put({type: "END_LOADING"});

        }

    }catch (e) {

        yield put({type: "END_LOADING"});

        yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });

    }

}


//Get nb view of an app + get average of marks for this app
export function* getNbAvis(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(get_nbr_avis_api, datas);

        if (response.data.status === 200){

            const moyenne = response.data.response[0].moyenne;

            yield put({type: "END_LOADING"});

            yield put({type: "GET_NB_AVIS_SUCCESS", moyenne: moyenne});

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{
            yield put({type: "END_LOADING"});

        }

    }catch (e) {

        yield put({type: "END_LOADING"});

        yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });

    }

}
