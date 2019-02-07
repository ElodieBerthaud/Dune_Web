const initialState = {
    professor: {fetching: false, nomProf:null, prenomProf: null, emailProf: null, error: null },
    drawer: {opened: false},
    login: {logged: false, token: null, redirect: false, director: null, tokenUnValid: null, typeUser: null},
    manageProfessor: {add: false, update: false, success: null, error: null},
    user: {lastname: null, name: null, email: null, pic: null},
    password: {asking: false, success: false, error: false, errorCode: null},
    students: {asking: false, success: false, error: false, content: null, nbStudents: 0},
    uploadimg: {file_preview: null, file_upload: null, canceled: false, selected: false, prevImage: false},
    snackContent: { success: false, error: false, message: null },
    updateProf: {pending: false, datas: null, success: false, error: false},
    studentProfile: {pending: false, nomEleve: null, prenomEleve: null, NoEleve: null, idEleve: null, picEleve: null, success: null, error: null, errorCode: null},
    classes: {pending: false, classes: null, success: null, error: null, errorCode: null},
    storeBuy: {pending: false, apps: null, success: null, error: null, errorCode: null},
    storeSchool: {pending: false, apps: null, success: null, error: null, errorCode: null},
    loading: {loading: false, loadmessage: null},
    appPage: {success: null, error: null, appContent: null, status: null},
    appRegistred: {success: null, error: null, apps: null, appsNbr: 0},
    notification: {success: null, error: null, content: null, nbNotif: null},
    showNotif: {success: null, error: null, nomProf: null, prenomProf: null, nomApp: null, idApp: null, typeNotif: null, idNotif: null, idDemande: null, isAccepted: null},
    reload: {status: false},
    showDash: {showDash: true}
}

export default initialState;