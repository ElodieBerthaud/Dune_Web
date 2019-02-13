import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    ADD_PROFESSOR_ERROR,
    ADD_PROFESSOR_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_ERROR,
    GET_IMG_RESPONSE,
    SNACK_PUT_SUCCESS,
    SNACK_PUT_ERROR,
    UPDATE_PROF_SUCCESS,
    UPDATE_PROF_ERROR,
    TOKEN_UNVALID,
    EMPTY_IMG_REQUEST,
    GET_APPS_BUY_REQUEST, GET_APP_REGISTRED_SUCCESS, GET_NOTIFS_SUCCESS, GET_STUDENTNBR
} from "./actions/actionTypes";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeEvery("OPEN_DRAWER_REQUEST", openDrawer);
    yield takeEvery("CLOSE_DRAWER_REQUEST", closeDrawer);
    yield takeEvery("LOGIN_REQUEST", login);
    yield takeEvery('LOGOUT_REQUEST', logout);
    yield takeEvery('ADD_PROFESSOR_REQUEST', add_professor);
    yield takeEvery('CHANGE_PASSWORD_REQUEST', change_password);
    yield takeEvery('GET_STUDENTS_REQUEST', get_all_students);
    yield takeEvery('GET_STUDENTSNBR_REQUEST', get_students_nbr);
    yield takeEvery('GET_IMG_REQUEST', show_image);
    yield takeEvery('SNACK_PUT_REQUEST', snack_req);
    yield takeEvery('UPDATE_PROF_REQUEST', update_prof);
    yield takeEvery('UPLOAD_IMG_REQUEST', uploadImage);
    yield takeEvery('VERIFY_TOKEN_REQUEST', verifyToken);
    yield takeEvery('STUDENT_PROFILE_REQUEST', student_profile);
    yield takeEvery('GET_CLASSES_REQUEST', getUserClasses);
    yield takeEvery('GET_APPS_BUY_REQUEST', getAppsBuy);
    yield takeEvery('CHANGE_IDENTI_REQUEST', changeIdentifiant);
    yield takeEvery('CHANGE_PASS_REQUEST', changePass);
    yield takeEvery('ADD_ELEVE_REQUEST', addStudent);
    yield takeEvery('GET_APP_REQUEST', getApp);
    yield takeEvery('GET_APPS_REGISTRED_REQUEST', getAppRegistred);
    yield takeEvery('GET_APPNBR_REQUEST', getAppRegistredNbr);
    yield takeEvery('ASK_APP_REQUEST', askApp);
    yield takeEvery('BUY_APP_REQUEST', buyApp);
    yield takeEvery('GET_NOTIFS_REQUEST', getNotifs);
    yield takeEvery('SHOW_NOTIF_REQUEST', showNotif);
    yield takeEvery('VALIDATE_APP_REQUEST', validateApp);
    yield takeEvery('READ_NOTIF_REQUEST', readNotif);
}

//GET PROFESSOR INFOS
// function that makes the api request and returns a Promise for response
function fetchProf(datas) {

    const url = "http://176.31.252.134:9001/api/v1/users/infos";

    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });
}

function fetchProfNotif(datas) {

    const url = "http://176.31.252.134:9001/api/v1/users/infos/" + datas.id;

    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });
}

//Try to Login
function login_in(logs){

    const datas = new URLSearchParams();
    datas.append('email', logs.email);
    datas.append('password', logs.password);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/login',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: datas
    })
}

//ADD PROF FROM API
function add_professor_api(add){

    const datas = new URLSearchParams();
    datas.append('nom', add.surname);
    datas.append('prenom', add.name);
    datas.append('email', add.email)
    datas.append('token', add.token);
    datas.append('directorId', 1);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/users/add',
        data: datas
    })

}

function change_password_api(datas){

    const datasTosend = new URLSearchParams();
    datasTosend.append('email', datas.email);


    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/login/reset',
        data: datasTosend
    })
}

function get_all_students_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('idClasse', datas.idClasse);

    datas.search = datas.search == undefined ? '' : datas.search;

    datasTosend.append('search', datas.search);

    var url = datas.idClasse == 0 ? 'http://176.31.252.134:9001/api/v1/trombi/' : 'http://176.31.252.134:9001/api/v1/trombi/byClasse';

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        },
        data: datasTosend
    });
}

function get_nbr_students_api(datas){

    var url = 'http://176.31.252.134:9001/api/v1/eleves/nbEleves';

    return axios({
        method: 'get',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });
}


function update_prof_api(datas){


    const datasTosend = new FormData();
    datasTosend.append('nomUser', datas.nomProf);
    datasTosend.append('prenomUser', datas.prenomProf);

    return axios({
        method: 'put',
        url: 'http://176.31.252.134:9001/api/v1/users/update',
        data: datasTosend,
        headers: {
        Accept: 'application/json',
            token: datas.token
    }
    })

}

function upload_img_api(datas){

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
        url: 'http://176.31.252.134:9001/api/v1' + url,
        headers: {
            token: datas.token
        },
        data: datasTosend
    });

}

function verify_token_api(datas){

    const datasTosend = new URLSearchParams();
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: 'http://176.31.252.134:9001/api/v1/tokens/verifyToken',
        data: datasTosend
    });

}

function student_profile_api(datas){

    return axios({
        method: 'get',
        url: 'http://176.31.252.134:9001/api/v1/eleves/' + datas.id,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        },
    });

}

function get_user_classes_api(datas){

    const datasTosend = new FormData();

    return axios({
        method: 'get',
        url: 'http://176.31.252.134:9001/api/v1/trombi/classes',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: datas.token
        }
    });

}

function get_apps_buy(datas){

    const url = "http://176.31.252.134:9001/api/v1/store";

    const datasTosend = new FormData();
    datasTosend.append('idType', '0');
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });
}

function change_ident_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/users/changeEmail";

    const datasTosend = new FormData();
    datasTosend.append('idUser', datas.idUser);
    datasTosend.append('password', datas.password);
    datasTosend.append('newEmail', datas.newEmail);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'put',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });

}

function change_pass_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/users/changePassword";

    const datasTosend = new FormData();
    datasTosend.append('idUser', datas.idUser);
    datasTosend.append('oldPassword', datas.oldPassword);
    datasTosend.append('newPassword', datas.newPassword);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'put',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });

}

function add_student_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/eleves/add";

    const datasTosend = new FormData();
    datasTosend.append('directorId', datas.directorId);
    datasTosend.append('nom', datas.nom);
    datasTosend.append('prenom', datas.prenom);
    datasTosend.append('picEleve', datas.picEleve);
    datasTosend.append('idClasse', datas.idClasse);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });

}

function get_app_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/store/getApp";

    const datasTosend = new FormData();
    datasTosend.append('idApp', datas.idApp);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: datasTosend
    });

}

function get_appstatus_api(datas) {

    const url = "http://176.31.252.134:9001/api/v1/store/getAppStatus/" + datas.idApp;

    return axios({
        method: 'get',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });

}

function get_app_registred_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/store/getAppsEcole";

    return axios({
        method: 'get',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

function get_app_registrednbr_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/games/nbGames";

    return axios({
        method: 'get',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

function ask_app_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/store/buyApp";

    const datasTosend = new FormData();
    datasTosend.append('idApp', datas.idApp);
    datasTosend.append('commentaire', datas.commentaire);
    datasTosend.append('token', datas.token);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: datas.token
        },
        data: datasTosend
    });
}

function buy_app_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/store/buyAppDirecteur";

    const datasTosend = new FormData();
    datasTosend.append('idApp', datas.idApp);

    return axios({
        method: 'post',
        url: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: datas.token
        },
        data: datasTosend
    });
}

function get_nb_notifs_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/notifs/getNbNotifs";

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

function get_all_notifs_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/notifs/popUpMenu";

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

function get_a_notif_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/notifs/getNotif/" + datas.idNotif;

    return axios({
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

function validate_app_api(datas){

    const datasTosend = new FormData();
    datasTosend.append('typeUser', datas.typeUser);
    datasTosend.append('idDemande', datas.idDemande);
    datasTosend.append('validate', datas.validate);

    const url = "http://176.31.252.134:9001/api/v1/store/validating";

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

function read_notif_api(datas){

    const url = "http://176.31.252.134:9001/api/v1/notifs/read/" + datas.idNotif;

    return axios({
        method: 'put',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            token: datas.token
        }
    });
}

//DRAWER

function* openDrawer(){

    yield put({type: "OPEN_DRAWER_SUCCESS", opened: true});
}

function* closeDrawer(){

    yield put({type: "CLOSE_DRAWER_SUCCESS", opened: false});
}

function* login(logs){

    var datas = {
        'email': logs.email,
        'password': logs.pass
    };

    try{

        const response = yield call(login_in, datas);

        if (response.data.success === true) {
            const token = response.data.token;
            const user_id = response.data.currUser;
            const director = response.data.typeUser === 1 ? false : true;
            const typeUser = response.data.typeUser;
            const idEcole = response.data.idEcole;
            yield put({ type: "LOGIN_SUCCESS", token: token, director: director, typeUser: typeUser});

            yield put({ type: "GET_NOTIFS_REQUEST", idUser: user_id, token: token});

            var datas_2 = {
                token: token,
                id: user_id
            };

            const response_2 = yield call(fetchProf, datas_2);

            if (response_2.data.status === 200) {

                const lastname = response_2.data.response[0].nomUser;
                const name = response_2.data.response[0].prenomUser;
                const email = response_2.data.response[0].emailUser;
                const pic = response_2.data.response[0].picPath;

                yield  put({ type: 'GET_USER_INFOS', lastname: lastname, name: name, email: email, pic: pic});

            }
        }

    }catch (e) {

        yield put({ type: "LOGIN_ERROR", e});

    }

}

function* logout(){

    try{
        yield put({type: 'LOGOUT_SUCCESS'});
    }catch (e) {
        yield put({type: 'LOGOUT_ERROR'});
    }

}

function* add_professor(datas){

    try{

        const response = yield call(add_professor_api, datas);

        if (response.data.status === 200){
            yield put({type: ADD_PROFESSOR_SUCCESS});
        }else if (response.data.status === 501){
            yield put({type: ADD_PROFESSOR_ERROR, error: 501});
        }

    }catch (e) {

        yield put({type: ADD_PROFESSOR_ERROR, error: e.response.status});

    }

}

function* change_password(datas){

    try{

        const response = yield call(change_password_api, datas);

        if (response.data.status === 200){
            yield put({type: CHANGE_PASSWORD_SUCCESS});

            yield put({type: SNACK_PUT_SUCCESS, message: 'Votre mot de passe vient de vous etre envoye par mail.'});
        }else{

            const error = response.data.status;

            yield put({type: CHANGE_PASSWORD_ERROR, errorCode: error});

            if (error === 502){
                yield put({type: SNACK_PUT_ERROR, message: 'Erreur. Aucun compte n\'est lie a cette Email.'});
            }

        }

    }catch (e) {

        yield put({type: CHANGE_PASSWORD_ERROR});

    }
}

function* get_all_students(datas){

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

function* get_students_nbr(datas){

    try{

        const response = yield call(get_nbr_students_api, datas);

        const nbStu = response.data.response[0].nbEleves;

        if (response.data.status === 200){
            yield put({type: GET_STUDENTNBR, nbStudents: nbStu});
        }else{
            yield put({type: GET_STUDENTS_ERROR});
        }

    }catch (e) {


    }
}

function*   show_image(file){

    try{

        yield put({type: GET_IMG_RESPONSE, file_preview: file.file, prevImage: true, file_upload: file.file_obj});

    }catch(e){

    }

}

function* snack_req(req){

    try{

        if (req.type === 'error'){
            yield put({type: SNACK_PUT_ERROR, message: req.message});
        }else{
            yield put({type: SNACK_PUT_SUCCESS, message: req.message});
        }

    }catch(e){

    }

}

function* update_prof(datas){

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

function* uploadImage(datas){

    try{

        const response = yield call(upload_img_api, datas);

        if (response.data.status === 200){

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
                yield put({type: EMPTY_IMG_REQUEST});
                yield put({type: SNACK_PUT_SUCCESS, message: 'Votre photo a bien éte mise a jour.'});
            }
        }

    }catch (e) {

    }

}

function* verifyToken(datas){

    try{

        const response = yield call(verify_token_api, datas);

        if (response.data.name === 'JsonWebTokenError'){
            yield put({type: TOKEN_UNVALID});
        }



    }catch (e) {

    }

}

function* student_profile(datas){

    try{

        const response = yield call(student_profile_api, datas);

        if (response.data.status === 200){
            const nomEleve = response.data.response[0].nomEleve;
            const prenomEleve = response.data.response[0].prenomEleve;
            const noEleve = response.data.response[0].BAE;
            const idEleve = datas.id;
            const picEleve = response.data.response[0].picPath;

            yield put({type: 'STUDENT_PROFILE_SUCCESS', nomEleve: nomEleve, prenomEleve: prenomEleve, noEleve: noEleve, idEleve: idEleve, picEleve: picEleve})

        }

    }catch (e) {

    }

}

function* getUserClasses(datas){

    try{

        const response = yield call(get_user_classes_api, datas);

        if (response.data.status === 200){

            const classes = response.data.response;

            yield put({type: "GET_CLASSES_SUCCESS", classes: classes });

        }

    }catch (e) {

    }

}

function* getAppsBuy(datas){

    try{

        const response = yield call(get_apps_buy, datas);

        if (response.data.status === 200){

            const apps = JSON.stringify(response.data.response);

            yield put({type: "GET_APPS_BUY_SUCCESS", apps: apps });

        }

    }catch (e) {

    }

}

function *changeIdentifiant(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(change_ident_api, datas);

        if (response.data.status === 200){

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Votre identifiant a bien ete change a " + datas.newEmail });

            setTimeout(function () {
                window.location.reload();
            }, 1500);

        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else if (response.data.status === 500){

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Erreur. Mot de passe invalide." });

            setTimeout(function () {
                window.location.reload();
            }, 1500);
        }

    }catch (e) {

    }

}

function* changePass(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(change_pass_api, datas);

        if (response.data.status === 200){

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_SUCCESS", message: "Votre mot de passe a bien ete change. Vous allez etre deconnecte"});
            yield put({type: "RELOAD_REQUEST"});


        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {

    }
}

function* addStudent(datas){

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

function* getApp(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(get_app_api, datas);

        const responseStatus = yield call(get_appstatus_api, datas);


        if (response.data.status === 200){

            yield put({type: "END_LOADING"});

            yield put({type: "GET_APP_SUCCESS", appContent: response.data.response[0], status: responseStatus.data.appStatus });


        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {
    }

}

function* getAppRegistred(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(get_app_registred_api, datas);

        if (response.data.status === 200){

            const apps = JSON.stringify(response.data.response);

            yield put({type: "END_LOADING"});

            yield put({type: "GET_APP_REGISTRED_SUCCESS", apps: apps });


        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {

    }

}

function* getAppRegistredNbr(datas){

    try{

        const response = yield call(get_app_registrednbr_api, datas);

        if (response.data.status === 200){

            const appsNbr = response.data.response[0].nbGames;

            yield put({type: "GET_APPNBR", appsNbr: appsNbr });


        }
        else{
        }

    }catch (e) {

    }

}

function* askApp(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(ask_app_api, datas);

        if (response.data.status === 200){

            const apps = JSON.stringify(response.data.response);

            yield put({type: "END_LOADING"});

            yield put({type: "GET_APP_REGISTRED_SUCCESS", apps: apps });

            yield put({type: "SNACK_PUT_SUCCESS", message: "La demande a bien ete effectuee." });

            yield put({type: "RELOAD_REQUEST"});


        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {
    }

}

function* buyApp(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });

    try{

        const response = yield call(buy_app_api, datas);

        if (response.data.status === 200){

            const apps = JSON.stringify(response.data.response);

            yield put({type: "END_LOADING"});

            yield put({type: "GET_APP_REGISTRED_SUCCESS", apps: apps });

            yield put({type: "SNACK_PUT_SUCCESS", message: "La demande a bien ete effectuee." });

            yield put({type: "RELOAD_REQUEST"});


        }
        //Pour l'instant, je ne vois pas l'utilite de mettre une erreur dans un state pour le changement d'identifiant. La snackBar est OK.
        else{

            yield put({type: "END_LOADING"});

            yield put({type: "SNACK_PUT_ERROR", message: "Une erreur s'est produite." });
        }

    }catch (e) {
    }

}

function* getNotifs(datas){

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

function* showNotif(datas){

    yield put({type: "LOADING", loadmessage: "Veuillez patienter." });


    try{

        const responseNotif = yield call(get_a_notif_api, datas);

        if (responseNotif.data.status === 200){

            const datasProf = {id: responseNotif.data.response[0].idProf, token: datas.token};

            const typeNotif = responseNotif.data.response[0].typeNotif;

            const idNotif = responseNotif.data.response[0].idNotif;

            const idDemande = responseNotif.data.response[0].idDemande;

            const isAccepted = responseNotif.data.response[0].isAccepted;

            const responseProf = yield call(fetchProfNotif, datasProf);

            if (responseProf.data.status === 200){

                const nomProf = responseProf.data.response[0].nomUser;

                const prenomProf = responseProf.data.response[0].prenomUser;

                const datasApp = {token: datas.token, idApp: responseNotif.data.response[0].idGame};

                const responseApp = yield call(get_app_api, datasApp);

                if (responseApp.data.status === 200) {

                    const nomApp = responseApp.data.response[0].nomApp;

                    const idApp = responseApp.data.response[0].id;

                    yield put({type: "SHOW_NOTIF_SUCCESS", nomProf: nomProf, prenomProf: prenomProf, nomApp: nomApp, idApp: idApp, typeNotif: typeNotif, idNotif: idNotif, idDemande: idDemande, isAccepted: isAccepted});
                    yield put({type: "END_LOADING"});

                }


            }

        }

    }catch (e) {
        yield put({type: "END_LOADING"});

    }

}

function* validateApp(datas){

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

function* readNotif(datas){

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
