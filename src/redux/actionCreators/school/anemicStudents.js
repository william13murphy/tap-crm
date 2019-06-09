import { createAction } from 'redux-actions';
import { getSchoolAnemicStudents } from 'api';

// Action type constants
export const FETCH_START = 'school/anemicStudents/FETCH_START';
export const FETCH_SUCCESS = 'school/anemicStudents/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/anemicStudents/FETCH_FAIL';
export const RESET_STATE = 'school/anemicStudents/RESET_STATE';

// Action objects
export const studentsFetchStart = createAction(FETCH_START);
export const studentsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentsFetchFail = createAction(FETCH_FAIL);
export const studentsResetState = createAction(RESET_STATE);

export function anemicStudentsFetch(id) {
  return dispatch => {
    dispatch(studentsFetchStart());

    getSchoolAnemicStudents(id)
      .done(payload => {
        dispatch(studentsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentsFetchFail(error));
      });
  };
}
