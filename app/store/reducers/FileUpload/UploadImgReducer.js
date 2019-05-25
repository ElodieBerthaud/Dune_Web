import initialState from '../../initialState';
import { GET_IMG_RESPONSE, EMPTY_IMG_REQUEST } from '../../../actions/actionTypes';

export default function login(state = initialState.uploadimg, action) {
  switch (action.type) {
    case GET_IMG_RESPONSE:
      return {
        ...state, file_preview: action.file_preview, file_upload: action.file_upload, canceled: false, prevImage: true
      };
    case EMPTY_IMG_REQUEST:
      return {
        ...state, file: null, canceled: true, prevImage: false
      };
    default:
      return state;
  }
}
