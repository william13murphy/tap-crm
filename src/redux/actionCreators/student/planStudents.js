import { createAction } from 'redux-actions';
import { getStudentPlanStudents } from 'api';

// Action type constants
export const FETCH_START = 'student/planStudents/FETCH_START';
export const FETCH_SUCCESS = 'student/planStudents/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planStudents/FETCH_FAIL';
export const RESET_STATE = 'student/planStudents/RESET_STATE';

// Action objects
export const studentPlanStudentsFetchStart = createAction(FETCH_START);
export const studentPlanStudentsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanStudentsFetchFail = createAction(FETCH_FAIL);
export const studentPlanStudentsResetState = createAction(RESET_STATE);

export function studentPlanStudentsFetch(id: string) {
  return dispatch => {
    dispatch(studentPlanStudentsFetchStart());

    getStudentPlanStudents((id: string))
      .done(studentPlanStudents => {
        dispatch(studentPlanStudentsFetchSuccess(studentPlanStudents));
      })
      .fail(error => {
        dispatch(studentPlanStudentsFetchFail(error));
      });
  };
}
