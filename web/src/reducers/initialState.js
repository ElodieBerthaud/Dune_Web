const initialState = {
    professor: {fetching: false, nomProf:null, prenomProf: null, emailProf: null, error: null },
    drawer: {opened: false},
    login: {logged: false, id_user: null, token: null, redirect: false},
    manageProfessor: {add: false, update: false, success: null, error: null}
}

export default initialState;