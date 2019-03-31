import { put, call } from "redux-saga/es/effects";
import {get_user_classes_api} from "../../Api/School/school_api_functions";

//Get all classes of a user
export function* getUserClasses(datas){

    try{

        const response = yield call(get_user_classes_api, datas);

        if (response.data.status === 200){

            const classes = response.data.response;

            yield put({type: "GET_CLASSES_SUCCESS", classes: classes });

        }

    }catch (e) {

    }

}
