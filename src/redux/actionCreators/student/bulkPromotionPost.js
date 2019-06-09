import { createAction } from 'redux-actions';
import { saveStudentBulkPromote } from 'api';

// Action type constants
export const POST_START = 'student/bulkPromotionPost/POST_START';
export const POST_SUCCESS = 'student/bulkPromotionPost/POST_SUCCESS';
export const POST_FAIL = 'student/bulkPromotionPost/POST_FAIL';
export const FORM_RESET = 'student/bulkPromotionPost/FORM_RESET';

// Action objects
export const studentBulkPromotionPostStart = createAction(POST_START);
export const studentBulkPromotionPostSuccess = createAction(POST_SUCCESS);
export const studentBulkPromotionPostFail = createAction(POST_FAIL);
export const studentBulkPromotionFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentBulkPromotionPost(formData) {
  return dispatch => {
    dispatch(studentBulkPromotionPostStart());

    saveStudentBulkPromote(formData)
      .done(() => {
        dispatch(studentBulkPromotionPostSuccess());
      })
      .fail(error => {
        dispatch(studentBulkPromotionPostFail(error));
      });
  };
}
