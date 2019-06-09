import { createAction } from 'redux-actions';
import { postSchoolStyleRate } from 'api';

// Action type constants
export const POST_START = 'school/styleRatePost/POST_START';
export const POST_SUCCESS = 'school/styleRatePost/POST_SUCCESS';
export const POST_FAIL = 'school/styleRatePost/POST_FAIL';
export const FORM_RESET = 'school/styleRatePost/FORM_RESET';

// Action objects
export const schoolStyleRatePostStart = createAction(POST_START);
export const schoolStyleRatePostSuccess = createAction(POST_SUCCESS);
export const schoolStyleRatePostFail = createAction(POST_FAIL);
export const schoolStyleRateFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolStyleRatePost(formData) {
  return dispatch => {
    dispatch(schoolStyleRatePostStart());

    postSchoolStyleRate(formData)
      .done(() => {
        dispatch(schoolStyleRatePostSuccess());
      })
      .fail(error => {
        dispatch(schoolStyleRatePostFail(error));
      });
  };
}
