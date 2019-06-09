import { createAction } from 'redux-actions';
import { saveSchoolRate } from 'api';

// Action type constants
export const POST_START = 'school/ratePost/POST_START';
export const POST_SUCCESS = 'school/ratePost/POST_SUCCESS';
export const POST_FAIL = 'school/ratePost/POST_FAIL';
export const FORM_RESET = 'school/ratePost/FORM_RESET';

// Action objects
export const schoolRatePostStart = createAction(POST_START);
export const schoolRatePostSuccess = createAction(POST_SUCCESS);
export const schoolRatePostFail = createAction(POST_FAIL);
export const schoolRateFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolRatePost(formData) {
  return dispatch => {
    dispatch(schoolRatePostStart());

    saveSchoolRate(formData)
      .done(() => {
        dispatch(schoolRatePostSuccess());
      })
      .fail(error => {
        dispatch(schoolRatePostFail(error));
      });
  };
}
