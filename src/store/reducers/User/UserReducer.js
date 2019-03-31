import initialState from '../../initialState';
import {GET_USER_INFOS} from "../../../actions/actionTypes";

export default function login(state = initialState.user, action) {
    switch (action.type) {
        case GET_USER_INFOS:
            return { ...state,  lastname: action.lastname, name: action.name, email: action.email, pic: action.pic};
        default:
            return state;
    }

}