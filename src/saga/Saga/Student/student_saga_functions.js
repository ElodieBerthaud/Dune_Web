import {GET_STUDENTNBR, GET_STUDENTS_ERROR, GET_STUDENTS_SUCCESS} from "../../../actions/actionTypes";
import { put, call } from "redux-saga/es/effects";
import {get_all_students_api, get_nbr_students_api, student_profile_api, add_student_api, get_student_results_api, update_student_api} from '../../Api/Students/students_api_functions';

//Get all student of a user
export function* get_all_students(datas){

    try{

        const response = yield call(get_all_students_api, datas);

        const content = JSON.stringify(response.data.response);

        if (response.data.status === 200){
            yield put({type: GET_STUDENTS_SUCCESS, content: content});
        }else{
            yield put({type: GET_STUDENTS_ERROR});
        }

    }catch (e) {


    }
}


//get nbr of user's student
export function* get_students_nbr(datas){

    try{

        const response = yield call(get_nbr_students_api, datas);

        const nbStu = response.data.nbEleves;

        if (response.data.status === 200){
            yield put({type: GET_STUDENTNBR, nbStudents: nbStu});
        }else{
            yield put({type: GET_STUDENTS_ERROR});
        }

    }catch (e) {


    }
}

//get all informations of a student
export function* student_profile(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(student_profile_api, datas);

        if (response.data.status === 200){
            const nomEleve = response.data.response[0].nomEleve;
            const prenomEleve = response.data.response[0].prenomEleve;
            const noEleve = response.data.response[0].BAE;
            const idEleve = datas.id;
            const picEleve = response.data.response[0].picPath;

            yield put({type: 'STUDENT_PROFILE_SUCCESS', nomEleve: nomEleve, prenomEleve: prenomEleve, noEleve: noEleve, idEleve: idEleve, picEleve: picEleve})
            yield put({type: "END_LOADING"});

        }else{
            yield put({type: "END_LOADING"});
        }

    }catch (e) {
        yield put({type: "END_LOADING"});
    }

}


//Add a student in a class
export function* addStudent(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(add_student_api, datas);

        if (response.data.status === 200){

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Le nouvel eleve a bien ete ajoute."});

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {

    }

}

export function* get_student_results(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(get_student_results_api, datas);

        console.log(response);

        if (response.data.status === 200){

            yield put({type: "END_LOADING"});
            let content = [];

            console.log(response.data.response.length);

            for (var i = 0 ; i < response.data.response.length; i++){
                var tmp = [];
                tmp.push(response.data.response[i].labeltype);
                tmp.push(response.data.response[i].moyenne);
                tmp.push(response.data.response[i].moyenneClasse);
                tmp.push(response.data.response[i].nbPlayed);
                content.push(tmp);
            }

            console.log(content);

            yield put({type: "STUDENT_RESULTS_SUCCESS",
                moyenneG: response.data.moyenneGeneralEleve,
                moyenneClasse: response.data.moyenneGeneraleClasse,
                content: content});

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {

    }

}

//Update stusents' infos
export function* updateStudent(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(update_student_api, datas);

        if (response.data.status === 200){

            yield call(student_profile, datas);

            yield put({type: "SNACK_PUT_SUCCESS", message: "Les informations ont bien été modifiées."});
        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {

    }

}
