import {
    ADD_PROFESSOR_ERROR,
    ADD_PROFESSOR_SUCCESS,
    SNACK_PUT_SUCCESS, UPDATE_PROF_ERROR,
    UPDATE_PROF_SUCCESS
} from "../../../actions/actionTypes";
import { put, call } from "redux-saga/es/effects";
import {fetchProf, add_professor_api, update_prof_api} from '../../Api/Professor/professor_api_functions';

//Add a professor
export function* add_professor(datas){
    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(add_professor_api, datas);

        if (response.data.status === 200){
            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Le professeur a bien été crée." });

            yield put({type: ADD_PROFESSOR_SUCCESS});

        }else if (response.data.status === 501){
            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Un compte existe déja avec cette adresse email. veuillez en entrer une autre." });

            yield put({type: ADD_PROFESSOR_ERROR, error: 501});
        }


    }catch (e) {
        yield put({type: "END_LOADING"});

        yield put({type: "SNACK_PUT_ERROR", message: "Une erreur est survenue." });
        yield put({type: ADD_PROFESSOR_ERROR, error: e.response.status});

    }

}


//Update a professor's informations
export function* update_prof(datas){

    try{

        const response = yield call(update_prof_api, datas);

        if (response.data.status === 200) {
            yield put({type: UPDATE_PROF_SUCCESS});
            yield put({type: SNACK_PUT_SUCCESS, message: 'Vos informations ont bien ete mises a jour.'});


            var datas_2 = {
                token: datas.token,
                id: datas.idProf
            };

            const response_2 = yield call(fetchProf, datas_2);
            if (response_2.data.status === 200) {

                const lastname = response_2.data.response[0].nomUser;
                const name = response_2.data.response[0].prenomUser;
                const email = response_2.data.response[0].emailUser;
                const pic = response_2.data.response[0].picPath;

                yield  put({type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email, pic: pic});
            }
        }else {
            yield put({type: UPDATE_PROF_ERROR})
        }
    }catch (e) {

    }

}
