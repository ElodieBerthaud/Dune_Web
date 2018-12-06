import initialState from './initialState';
import {
    UPDATE_PROF_ERROR,
    UPDATE_PROF_SUCCESS
} from '../actions/actionTypes';

export default function updateprof(state = initialState.updateProf, action) {

    switch (action.type) {
        case UPDATE_PROF_SUCCESS:
            return { ...state, error: false, success: true, datas: action.datas };
        case UPDATE_PROF_ERROR:
            return { ...state, success: false, error: true, datas: null };
        default:
            return state;
    }

}