const initialState = {
    professor: {fetching: false, nomProf:null, prenomProf: null, emailProf: null, error: null },
    drawer: {opened: false},
    login: {logged: false, id_user: null, token: null, redirect: false, director: null},
    manageProfessor: {add: false, update: false, success: null, error: null},
    user: {lastname: null, name: null, email: null},
    password: {asking: false, success: false, error: false, errorCode: null},
    students: {asking: false, success: false, error: false, content: null},
    uploadimg: {file: null, canceled: false}
}

export default initialState;