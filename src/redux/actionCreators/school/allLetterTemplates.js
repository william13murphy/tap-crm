import { createAction } from 'redux-actions';
import { getSchoolAllLetterTemplates } from 'api';

// Action type constants
export const FETCH_START = 'school/allLetterTemplates/FETCH_START';
export const FETCH_SUCCESS = 'school/allLetterTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allLetterTemplates/FETCH_FAIL';
export const RESET_STATE = 'school/allLetterTemplates/RESET_STATE';

// Action objects
export const allLetterTemplatesFetchStart = createAction(FETCH_START);
export const allLetterTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const allLetterTemplatesFetchFail = createAction(FETCH_FAIL);
export const allLetterTemplatesResetState = createAction(RESET_STATE);

export function allLetterTemplatesFetch(id) {
  return dispatch => {
    dispatch(allLetterTemplatesFetchStart());

    getSchoolAllLetterTemplates(id)
      .done(payload => {
        dispatch(allLetterTemplatesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allLetterTemplatesFetchFail(error));
      });
  };
}
