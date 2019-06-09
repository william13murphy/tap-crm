import { createAction } from 'redux-actions';
import { getAllStudents } from 'api';

// Action type constants
export const FETCH_START = 'student/allStudents/FETCH_START';
export const FETCH_SUCCESS = 'student/allStudents/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/allStudents/FETCH_FAIL';

// Action objects
export const allStudentsFetchStart = createAction(FETCH_START);
export const allStudentsFetchSuccess = createAction(FETCH_SUCCESS);
export const allStudentsFetchFail = createAction(FETCH_FAIL);

export function allStudentsFetch() {
  return dispatch => {
    dispatch(allStudentsFetchStart());

    getAllStudents()
      .done(allStudents => {
        dispatch(allStudentsFetchSuccess(allStudents));
      })
      .fail(error => {
        dispatch(allStudentsFetchFail(error));
      });
  };
}
