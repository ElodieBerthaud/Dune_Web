const initialState = {
    professor: {fetching: false, nomProf:null, prenomProf: null, emailProf: null, error: null },
    drawer: {opened: false},
    login: {logged: false, id_user: null, token: null, redirect: false, director: null, tokenUnValid: null},
    manageProfessor: {add: false, update: false, success: null, error: null},
    user: {lastname: null, name: null, email: null},
    password: {asking: false, success: false, error: false, errorCode: null},
    students: {asking: false, success: false, error: false, content: null},
    uploadimg: {file: null, canceled: false, selected: false, prevImage: false},
    snackContent: { success: false, error: false, message: null },
    updateProf: {pending: false, datas: null, success: false, error: false},
    studentProfile: {pending: false, nomEleve: null, prenomEleve: null, NoEleve: null, success: null, error: null, errorCode: null}
}

export default initialState;