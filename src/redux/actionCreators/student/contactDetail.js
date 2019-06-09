import { createAction } from 'redux-actions';
import { getStudentContactDetail } from 'api';

// Action type constants
export const FETCH_START = 'student/contactDetail/FETCH_START';
export const FETCH_SUCCESS = 'student/contactDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/contactDetail/FETCH_FAIL';
export const RESET_STATE = 'student/contactDetail/RESET_STATE';
// Action objects
export const studentContactDetailFetchStart = createAction(FETCH_START);
export const studentContactDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const studentContactDetailFetchFail = createAction(FETCH_FAIL);
export const studentContactDetailResetState = createAction(RESET_STATE);

export function studentContactDetailFetch(id) {
  return dispatch => {
    dispatch(studentContactDetailFetchStart());

    getStudentContactDetail(id)
      .done(studentContactDetail => {
        dispatch(studentContactDetailFetchSuccess(studentContactDetail));
      })
      .fail(error => {
        dispatch(studentContactDetailFetchFail(error));
      });
  };
}
