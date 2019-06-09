import { createAction } from 'redux-actions';
import { saveSchoolBank } from 'api';

// Action type constants
export const POST_START = 'school/bankPost/POST_START';
export const POST_SUCCESS = 'school/bankPost/POST_SUCCESS';
export const POST_FAIL = 'school/bankPost/POST_FAIL';
export const FORM_RESET = 'school/bankPost/FORM_RESET';

// Action objects
export const schoolBankPostStart = createAction(POST_START);
export const schoolBankPostSuccess = createAction(POST_SUCCESS);
export const schoolBankPostFail = createAction(POST_FAIL);
export const schoolBankFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolBankPost(formData) {
  return dispatch => {
    dispatch(schoolBankPostStart());

    saveSchoolBank(formData)
      .done(() => {
        dispatch(schoolBankPostSuccess());
      })
      .fail(error => {
        dispatch(schoolBankPostFail(error));
      });
  };
}
