import { createAction } from 'redux-actions';
import { getStudentCount } from 'api';

// Action type constants
export const FETCH_START = 'report/studentCount/FETCH_START';
export const FETCH_SUCCESS = 'report/studentCount/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/studentCount/FETCH_FAIL';
export const RESET_STATE = 'report/studentCount/RESET_STATE';

// Action objects
export const studentCountFetchStart = createAction(FETCH_START);
export const studentCountFetchSuccess = createAction(FETCH_SUCCESS);
export const studentCountFetchFail = createAction(FETCH_FAIL);
export const studentCountResetState = createAction(RESET_STATE);

export function studentCountFetch(id: string) {
  return dispatch => {
    dispatch(studentCountFetchStart());

    getStudentCount((id: string))
      .done(payload => {
        dispatch(studentCountFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentCountFetchFail(error));
      });
  };
}
