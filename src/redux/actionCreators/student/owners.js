import { getStudentOwners } from 'api';
import { createAction } from 'redux-actions';

// Action Type Constants
export const FETCH_START = 'student/owners/FETCH_START';
export const FETCH_SUCCESS = 'student/owners/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/owners/FETCH_FAIL';
export const RESET_STATE = 'student/owners/FETCH_STATE';

// Action Objects
export const studentOwnersFetchStart = createAction(FETCH_START);
export const studentOwnersFetchSuccess = createAction(FETCH_SUCCESS);
export const studentOwnersFetchFail = createAction(FETCH_FAIL);
export const studentOwnersResetState = createAction(RESET_STATE);

export function studentOwnersFetch(id: string) {
  return dispatch => {
    dispatch(studentOwnersFetchStart());

    getStudentOwners((id: string))
      .done(payload => {
        dispatch(studentOwnersFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentOwnersFetchFail(error));
      });
  };
}
