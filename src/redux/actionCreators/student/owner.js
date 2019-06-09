import { createAction } from 'redux-actions';
import { getStudentOwner } from 'api';

// Action Type Constants
export const FETCH_START = 'student/owner/FETCH_START';
export const FETCH_SUCCESS = 'student/owner/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/owner/FETCH_FAIL';
export const RESET_STATE = 'student/owner/RESET_STATE';

// Action objects
export const studentOwnerFetchStart = createAction(FETCH_START);
export const studentOwnerFetchSuccess = createAction(FETCH_SUCCESS);
export const studentOwnerFetchFail = createAction(FETCH_FAIL);
export const studentOwnerResetState = createAction(RESET_STATE);

export function ownerFetch(id: string) {
  return dispatch => {
    dispatch(studentOwnerFetchStart());

    getStudentOwner((id: string))
      .done(payload => {
        dispatch(studentOwnerFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentOwnerFetchFail(error));
      });
  };
}
