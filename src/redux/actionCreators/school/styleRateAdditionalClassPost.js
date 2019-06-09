import { createAction } from 'redux-actions';
import { postSchoolStyleRateAdditionalClass } from 'api';

// Action type constants
export const POST_START = 'school/styleRateAdditionalClassPost/POST_START';
export const POST_SUCCESS = 'school/styleRateAdditionalClassPost/POST_SUCCESS';
export const POST_FAIL = 'school/styleRateAdditionalClassPost/POST_FAIL';
export const FORM_RESET = 'school/styleRateAdditionalClassPost/FORM_RESET';

// Action objects
export const schoolStyleRateAdditionalClassPostStart = createAction(POST_START);
export const schoolStyleRateAdditionalClassPostSuccess = createAction(
  POST_SUCCESS
);
export const schoolStyleRateAdditionalClassPostFail = createAction(POST_FAIL);
export const schoolStyleRateAdditionalClassFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolStyleRateAdditionalClassPost(formData) {
  return dispatch => {
    dispatch(schoolStyleRateAdditionalClassPostStart());

    postSchoolStyleRateAdditionalClass(formData)
      .done(() => {
        dispatch(schoolStyleRateAdditionalClassPostSuccess());
      })
      .fail(error => {
        dispatch(schoolStyleRateAdditionalClassPostFail(error));
      });
  };
}
