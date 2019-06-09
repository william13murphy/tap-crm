import { createAction } from 'redux-actions';
import { saveSchoolAddress } from 'api';

// Action type constants
export const POST_START = 'school/addressPost/POST_START';
export const POST_SUCCESS = 'school/addressPost/POST_SUCCESS';
export const POST_FAIL = 'school/addressPost/POST_FAIL';
export const FORM_RESET = 'school/addressPost/FORM_RESET';

// Action objects
export const schoolAddressPostStart = createAction(POST_START);
export const schoolAddressPostSuccess = createAction(POST_SUCCESS);
export const schoolAddressPostFail = createAction(POST_FAIL);
export const schoolAddressFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolAddressPost(formData) {
  return dispatch => {
    dispatch(schoolAddressPostStart());

    saveSchoolAddress(formData)
      .done(() => {
        dispatch(schoolAddressPostSuccess());
      })
      .fail(error => {
        dispatch(schoolAddressPostFail(error));
      });
  };
}
