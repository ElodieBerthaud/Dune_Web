import initialState from './initialState';
import {
    STUDENT_PROFILE_REQUEST,
    STUDENT_PROFILE_SUCCESS,
    STUDENT_PROFILE_ERROR,
} from '../actions/actionTypes';

export default function students(state = initialState.studentProfile, action) {

    switch (action.type) {
        case STUDENT_PROFILE_REQUEST:
            return { ...state, asking: true };
        case STUDENT_PROFILE_SUCCESS:
            return { ...state, pending: false, nomEleve: action.nomEleve, prenomEleve: action.prenomEleve, NoEleve: action.noEleve, success: true, error: false };
        case STUDENT_PROFILE_ERROR:
            return { ...state, asking: false, error: true, success: false, errorCode: action.errorCode };
        default:
            return state;
    }

}