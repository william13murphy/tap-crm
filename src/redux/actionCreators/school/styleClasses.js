import { createAction } from 'redux-actions';
import { getSchoolStyleClasses } from 'api';

// Action type constants
export const FETCH_START = 'school/styleClasses/FETCH_START';
export const FETCH_SUCCESS = 'school/styleClasses/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleClasses/FETCH_FAIL';
export const RESET_STATE = 'school/styleClasses/RESET_STATE';

// Action objects
export const schoolStyleClassesFetchStart = createAction(FETCH_START);
export const schoolStyleClassesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleClassesFetchFail = createAction(FETCH_FAIL);
export const schoolStyleClassesResetState = createAction(RESET_STATE);

export function schoolStyleClassesFetch(id: string) {
  return dispatch => {
    dispatch(schoolStyleClassesFetchStart());

    getSchoolStyleClasses((id: string))
      .done(schoolStyleClasses => {
        dispatch(schoolStyleClassesFetchSuccess(schoolStyleClasses));
      })
      .fail(error => {
        dispatch(schoolStyleClassesFetchFail(error));
      });
  };
}
