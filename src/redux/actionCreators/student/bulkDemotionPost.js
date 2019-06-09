import { createAction } from 'redux-actions';
import { saveStudentBulkDemote } from 'api';

// Action type constants
export const POST_START = 'student/bulkDemotionPost/POST_START';
export const POST_SUCCESS = 'student/bulkDemotionPost/POST_SUCCESS';
export const POST_FAIL = 'student/bulkDemotionPost/POST_FAIL';
export const FORM_RESET = 'student/bulkDemotionPost/FORM_RESET';

// Action objects
export const studentBulkDemotionPostStart = createAction(POST_START);
export const studentBulkDemotionPostSuccess = createAction(POST_SUCCESS);
export const studentBulkDemotionPostFail = createAction(POST_FAIL);
export const studentBulkDemotionFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentBulkPromotionPost(formData) {
  return dispatch => {
    dispatch(studentBulkDemotionPostStart());

    saveStudentBulkDemote(formData)
      .done(() => {
        dispatch(studentBulkDemotionPostSuccess());
      })
      .fail(error => {
        dispatch(studentBulkDemotionPostFail(error));
      });
  };
}
