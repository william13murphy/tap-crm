import { createAction } from 'redux-actions';
import { getStudentLocation } from 'api';

// Action type constants
export const FETCH_START = 'report/studentLocation/FETCH_START';
export const FETCH_SUCCESS = 'report/studentLocation/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/studentLocation/FETCH_FAIL';
export const RESET_STATE = 'report/studentLocation/RESET_STATE';

// Action objects
export const studentLocationFetchStart = createAction(FETCH_START);
export const studentLocationFetchSuccess = createAction(FETCH_SUCCESS);
export const studentLocationFetchFail = createAction(FETCH_FAIL);
export const studentLocationResetState = createAction(RESET_STATE);

export function studentLocationFetch(id: string) {
  return dispatch => {
    dispatch(studentLocationFetchStart());

    getStudentLocation((id: string))
      .done(payload => {
        dispatch(studentLocationFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentLocationFetchFail(error));
      });
  };
}
