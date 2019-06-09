import { getStudentOutbox } from 'api';
import { createAction } from 'redux-actions';

// Action Type Constants
export const FETCH_START = 'student/outbox/FETCH_START';
export const FETCH_SUCCESS = 'student/outbox/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/outbox/FETCH_FAIL';
export const RESET_STATE = 'student/outbox/FETCH_STATE';

// Action Objects
export const studentOutboxFetchStart = createAction(FETCH_START);
export const studentOutboxFetchSuccess = createAction(FETCH_SUCCESS);
export const studentOutboxFetchFail = createAction(FETCH_FAIL);
export const studentOutboxResetState = createAction(RESET_STATE);

export function studentOutboxFetch(id: string) {
  return dispatch => {
    dispatch(studentOutboxFetchStart());

    getStudentOutbox(id)
      .done(payload => {
        dispatch(studentOutboxFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentOutboxFetchFail(error));
      });
  };
}
