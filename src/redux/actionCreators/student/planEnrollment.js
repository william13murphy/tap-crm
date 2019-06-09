import { createAction } from 'redux-actions';

// postStudentPlanEnrollment is a "post", but acts like a "get".
import { postStudentPlanEnrollment as getStudentPlanEnrollment } from 'api';

// Action type constants
export const FETCH_START = 'student/planEnrollment/FETCH_START';
export const FETCH_SUCCESS = 'student/planEnrollment/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planEnrollment/FETCH_FAIL';
export const RESET_STATE = 'student/planEnrollment/RESET_STATE';

// Action objects
export const studentPlanEnrollmentFetchStart = createAction(FETCH_START);
export const studentPlanEnrollmentFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanEnrollmentFetchFail = createAction(FETCH_FAIL);
export const studentPlanEnrollmentResetState = createAction(RESET_STATE);

export function studentPlanEnrollmentFetch(id) {
  return dispatch => {
    dispatch(studentPlanEnrollmentFetchStart());

    getStudentPlanEnrollment(id)
      .done(studentPlanEnrollment => {
        dispatch(studentPlanEnrollmentFetchSuccess(studentPlanEnrollment));
      })
      .fail(error => {
        dispatch(studentPlanEnrollmentFetchFail(error));
      });
  };
}
