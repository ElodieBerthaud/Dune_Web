const initialState = {
  professor: {
    fetching: false, nomProf: null, prenomProf: null, emailProf: null, error: null
  },
  drawer: { opened: false },
  login: {
    logged: false, token: null, redirect: false, director: null, tokenUnValid: false, typeUser: null, idUser: null, tutorial: null
  },
  manageProfessor: {
    add: false, update: false, success: null, error: null
  },
  user: {
    lastname: null, name: null, email: null, pic: null
  },
  password: {
    asking: false, success: false, error: false, errorCode: null
  },
  students: {
    asking: false, success: false, error: false, content: null, nbStudents: 0
  },
  uploadimg: {
    file_preview: null, file_upload: null, canceled: false, selected: false, prevImage: false
  },
  snackContent: {
    success: false, error: false, message: null, redirect: false, pathToRedirect: null
  },
  updateProf: {
    pending: false, datas: null, success: false, error: false
  },
  studentProfile: {
    pending: false, nomEleve: null, prenomEleve: null, NoEleve: null, idEleve: null, picEleve: null, success: null, error: null, errorCode: null
  },
  classes: {
    pending: false, classes: null, success: null, error: null, errorCode: null
  },
  storeBuy: {
    pending: false, apps: null, success: null, error: null, errorCode: null
  },
  storeSchool: {
    pending: false, apps: null, success: null, error: null, errorCode: null
  },
  loading: { loading: false, loadmessage: null },
  appPage: {
    success: null, error: null, appContent: null, status: null
  },
  appRegistred: {
    success: null, error: null, apps: null, appsNbr: 0
  },
  notification: {
    success: null, error: null, content: null, nbNotif: null
  },
  showNotif: {
    success: null, error: null, contentProf: null, nomApp: null, idApp: null, typeNotif: null, idNotif: null, idDemande: null, isAccepted: null, imgApp: null, show: false
  },
  reload: { status: false },
  showDash: { showDash: true },
  showDashTmp: { showDash: true },
  getAvis: {
    error: null, success: null, contentAvis: null, nbAvis: null
  },
  nbAvis: {
    nbAvis: null, moyenne: null, success: null, error: null, lastNbAvis: null
  },
  files: { success: null, error: null, files: null },
  studentResults: {
    success: null, error: null, content: null, moyenneG: null, moyenneClasse: null
  },
  down: { file: null, link: null },
  dashboard: { GamesPlayed: null, rank: null, classesAvg: null },
  subscribe: {
    current_abo: null, isValid: null, popupOpen: false, popupContent: null, popupAboTitle: null, aboId: null
  },
  payments: {
    ibanInfos: null, paymentTime: null, isPayed: null, access_infos: false, passPopup: false
  },
  userAvis: {
    avis: null, note: null, commentaire: null
  }
};

export default initialState;
