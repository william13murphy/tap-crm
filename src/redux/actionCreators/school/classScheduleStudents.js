import { createAction } from 'redux-actions';
import { getSchoolClassScheduleStudents } from 'api';
// Action type constants
export const FETCH_START = 'school/classScheduleStudents/FETCH_START';
export const FETCH_SUCCESS = 'school/classScheduleStudents/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/classScheduleStudents/FETCH_FAIL';
export const RESET_STATE = 'school/classScheduleStudents/RESET_STATE';

// Action objects
export const schoolClassScheduleStudentsFetchStart = createAction(FETCH_START);
export const schoolClassScheduleStudentsFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolClassScheduleStudentsFetchFail = createAction(FETCH_FAIL);
export const schoolClassScheduleStudentsResetState = createAction(RESET_STATE);

export function schoolClassScheduleStudentsFetch(id) {
  return dispatch => {
    dispatch(schoolClassScheduleStudentsFetchStart());

    getSchoolClassScheduleStudents(id)
      .done(payload => {
        dispatch(schoolClassScheduleStudentsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClassScheduleStudentsFetchFail(error));
      });
  };
}
