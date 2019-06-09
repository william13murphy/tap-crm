import { createAction } from 'redux-actions';
import { deleteSchoolStyleRateAdditionalClasses } from 'api';

// Action type constants
export const POST_START = 'school/styleRateAdditionalClassesDelete/POST_START';
export const POST_SUCCESS =
  'school/styleRateAdditionalClassesDelete/POST_SUCCESS';
export const POST_FAIL = 'school/styleRateAdditionalClassesDelete/POST_FAIL';
export const FORM_RESET = 'school/styleRateAdditionalClassesDelete/FORM_RESET';

// Action objects
export const schoolStyleRateAdditionalClassesDeleteStart = createAction(
  POST_START
);
export const schoolStyleRateAdditionalClassesDeleteSuccess = createAction(
  POST_SUCCESS
);
export const schoolStyleRateAdditionalClassesDeleteFail = createAction(
  POST_FAIL
);
export const schoolStyleRateAdditionalClassesDeleteFormReset = createAction(
  FORM_RESET
);

// Thunk action objects
export function schoolStyleRateAdditionalClassesDelete(formData) {
  return dispatch => {
    dispatch(schoolStyleRateAdditionalClassesDeleteStart());

    deleteSchoolStyleRateAdditionalClasses(formData)
      .done(payload => {
        dispatch(schoolStyleRateAdditionalClassesDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolStyleRateAdditionalClassesDeleteFail(error));
      });
  };
}
