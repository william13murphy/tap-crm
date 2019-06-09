import { createAction } from 'redux-actions';
import { saveSchoolStyleRank } from 'api';

// Action type constants
export const POST_START = 'school/styleRankPost/POST_START';
export const POST_SUCCESS = 'school/styleRankPost/POST_SUCCESS';
export const POST_FAIL = 'school/styleRankPost/POST_FAIL';
export const FORM_RESET = 'school/styleRankPost/FORM_RESET';

// Action objects
export const schoolStyleRankPostStart = createAction(POST_START);
export const schoolStyleRankPostSuccess = createAction(POST_SUCCESS);
export const schoolStyleRankPostFail = createAction(POST_FAIL);
export const schoolStyleRankFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolStyleRankPost(formData) {
  return dispatch => {
    dispatch(schoolStyleRankPostStart());

    saveSchoolStyleRank(formData)
      .done(() => {
        dispatch(schoolStyleRankPostSuccess());
      })
      .fail(error => {
        dispatch(schoolStyleRankPostFail(error));
      });
  };
}
