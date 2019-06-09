import { createAction } from 'redux-actions';
import { getSchoolUtilityStudents } from 'api';

// Action type constants
export const FETCH_START = 'school/utilityStudents/FETCH_START';
export const FETCH_SUCCESS = 'school/utilityStudents/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/utilityStudents/FETCH_FAIL';
export const RESET_STATE = 'school/utilityStudents/RESET_STATE';

// Action objects
export const schoolUtilityStudentsFetchStart = createAction(FETCH_START);
export const schoolUtilityStudentsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolUtilityStudentsFetchFail = createAction(FETCH_FAIL);
export const schoolUtilityStudentsResetState = createAction(RESET_STATE);

export function schoolUtilityStudentsFetch(schoolId) {
  return dispatch => {
    dispatch(schoolUtilityStudentsFetchStart());

    getSchoolUtilityStudents(schoolId)
      .done(payload => {
        dispatch(schoolUtilityStudentsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolUtilityStudentsFetchFail(error));
      });
  };
}
