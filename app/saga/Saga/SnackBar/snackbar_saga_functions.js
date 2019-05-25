import { put } from 'redux-saga/es/effects';
import { SNACK_PUT_ERROR, SNACK_PUT_SUCCESS } from '../../../actions/actionTypes';

export function* snack_req(req) {
  try {
    if (req.type === 'error') {
      yield put({ type: SNACK_PUT_ERROR, message: req.message });
    } else {
      yield put({ type: SNACK_PUT_SUCCESS, message: req.message });
    }
  } catch (e) {

  }
}
