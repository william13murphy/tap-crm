import { createAction } from 'redux-actions';
import { getStudentMessages } from 'api';

// Action type constants
export const FETCH_START = 'student/messages/FETCH_START';
export const FETCH_SUCCESS = 'student/messages/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/messages/FETCH_FAIL';
export const RESET_STATE = 'student/messages/RESET_STATE';

// Action objects
export const studentMessagesFetchStart = createAction(FETCH_START);
export const studentMessagesFetchSuccess = createAction(FETCH_SUCCESS);
export const studentMessagesFetchFail = createAction(FETCH_FAIL);
export const studentMessagesResetState = createAction(RESET_STATE);

export function studentMessagesFetch(id: string) {
  return dispatch => {
    dispatch(studentMessagesFetchStart());

    getStudentMessages((id: string))
      .done(studentMessages => {
        dispatch(studentMessagesFetchSuccess(studentMessages));
      })
      .fail(error => {
        dispatch(studentMessagesFetchFail(error));
      });
  };
}
