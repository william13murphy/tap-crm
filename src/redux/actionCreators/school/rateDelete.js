import { createAction } from 'redux-actions';
import { deleteSchoolRate } from 'api';

// Action type constants
export const POST_START = 'school/rateDelete/POST_START';
export const POST_SUCCESS = 'school/rateDelete/POST_SUCCESS';
export const POST_FAIL = 'school/rateDelete/POST_FAIL';
export const FORM_RESET = 'school/rateDelete/FORM_RESET';

// Action objects
export const schoolRateDeleteStart = createAction(POST_START);
export const schoolRateDeleteSuccess = createAction(POST_SUCCESS);
export const schoolRateDeleteFail = createAction(POST_FAIL);
export const schoolRateDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolRateDelete(formData) {
  return dispatch => {
    dispatch(schoolRateDeleteStart());

    deleteSchoolRate(formData)
      .done(payload => {
        dispatch(schoolRateDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolRateDeleteFail(error));
      });
  };
}
