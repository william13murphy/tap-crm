import { createAction } from 'redux-actions';
import { getStudentDetail } from 'api';

// Action type constants
export const FETCH_START = 'student/detail/FETCH_START';
export const FETCH_SUCCESS = 'student/detail/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/detail/FETCH_FAIL';
export const RESET_STATE = 'student/detail/RESET_STATE';

// Action objects
export const studentDetailFetchStart = createAction(FETCH_START);
export const studentDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const studentDetailFetchFail = createAction(FETCH_FAIL);
export const studentDetailResetState = createAction(RESET_STATE);

export function studentDetailFetch(id) {
  return dispatch => {
    dispatch(studentDetailFetchStart());

    getStudentDetail(id)
      .done(studentDetail => {
        dispatch(studentDetailFetchSuccess(studentDetail));
      })
      .fail(error => {
        dispatch(studentDetailFetchFail(error));
      });
  };
}
