import { createAction } from 'redux-actions';
import { getSchoolAllStudentLists } from 'api';

// Action type constants
export const FETCH_START = 'school/allStudentLists/FETCH_START';
export const FETCH_SUCCESS = 'school/allStudentLists/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allStudentLists/FETCH_FAIL';
export const RESET_STATE = 'school/allStudentLists/RESET_STATE';

// Action objects
export const allStudentListsFetchStart = createAction(FETCH_START);
export const allStudentListsFetchSuccess = createAction(FETCH_SUCCESS);
export const allStudentListsFetchFail = createAction(FETCH_FAIL);
export const allStudentListsResetState = createAction(RESET_STATE);

export function allStudentListsFetch(id) {
  return dispatch => {
    dispatch(allStudentListsFetchStart());

    getSchoolAllStudentLists(id)
      .done(payload => {
        dispatch(allStudentListsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allStudentListsFetchFail(error));
      });
  };
}
