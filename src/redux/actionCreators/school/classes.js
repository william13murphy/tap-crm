import { createAction } from 'redux-actions';
import { getSchoolClasses } from 'api';
// Action type constants
export const FETCH_START = 'school/classes/FETCH_START';
export const FETCH_SUCCESS = 'school/classes/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/classes/FETCH_FAIL';
export const RESET_STATE = 'school/classes/RESET_STATE';

// Action objects
export const schoolClassesFetchStart = createAction(FETCH_START);
export const schoolClassesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolClassesFetchFail = createAction(FETCH_FAIL);
export const schoolClassesResetState = createAction(RESET_STATE);

export function schoolClassesFetch(id) {
  return dispatch => {
    dispatch(schoolClassesFetchStart());

    getSchoolClasses(id)
      .done(payload => {
        dispatch(schoolClassesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClassesFetchFail(error));
      });
  };
}
