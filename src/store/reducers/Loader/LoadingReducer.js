import initialState from '../../initialState';
import {LOADING, END_LOADING} from "../../../actions/actionTypes";

export default function login(state = initialState.loading, action) {
    switch (action.type) {
        case LOADING:
            return { ...state,  loading: true};
        case END_LOADING:
            return { ...state,  loading: false};
        default:
            return state;
    }

}