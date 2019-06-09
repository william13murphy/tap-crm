import { createAction } from 'redux-actions';
import { saveSchoolMarketing } from 'api';

// Action type constants
export const POST_START = 'school/marketingPost/POST_START';
export const POST_SUCCESS = 'school/marketingPost/POST_SUCCESS';
export const POST_FAIL = 'school/marketingPost/POST_FAIL';
export const FORM_RESET = 'school/marketingPost/FORM_RESET';

// Action objects
export const schoolMarketingPostStart = createAction(POST_START);
export const schoolMarketingPostSuccess = createAction(POST_SUCCESS);
export const schoolMarketingPostFail = createAction(POST_FAIL);
export const schoolMarketingPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolMarketingPost(formData) {
  return dispatch => {
    dispatch(schoolMarketingPostStart());

    saveSchoolMarketing(formData)
      .done(() => {
        dispatch(schoolMarketingPostSuccess());
      })
      .fail(error => {
        dispatch(schoolMarketingPostFail(error));
      });
  };
}
