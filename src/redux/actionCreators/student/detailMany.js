import { createAction } from 'redux-actions';
import { getStudentDetail } from 'api';

// Action type constants
export const FETCH_START = 'student/detailMany/FETCH_START';
export const FETCH_SUCCESS = 'student/detailMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/detailMany/FETCH_FAIL';
export const RESET_STATE = 'student/detailMany/RESET_STATE';

// Action objects
export const studentDetailManyFetchStart = createAction(FETCH_START);
export const studentDetailManyFetchSuccess = createAction(FETCH_SUCCESS);
export const studentDetailManyFetchFail = createAction(FETCH_FAIL);
export const studentDetailManyResetState = createAction(RESET_STATE);

export function studentDetailManyFetch(studentId: string) {
  return dispatch => {
    dispatch(studentDetailManyFetchStart({ id: studentId }));

    getStudentDetail((studentId: string))
      .done(payload => {
        dispatch(
          studentDetailManyFetchSuccess({
            id: studentId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(studentDetailManyFetchFail(error));
      });
  };
}
