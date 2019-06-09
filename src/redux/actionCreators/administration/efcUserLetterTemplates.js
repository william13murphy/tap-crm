import { createAction } from 'redux-actions';
import { getEfcUserLetterTemplates } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserLetterTemplates/FETCH_START';
export const FETCH_SUCCESS =
  'administration/efcUserLetterTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserLetterTemplates/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserLetterTemplates/RESET_STATE';

// Action objects
export const efcUserLetterTemplatesFetchStart = createAction(FETCH_START);
export const efcUserLetterTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserLetterTemplatesFetchFail = createAction(FETCH_FAIL);
export const efcUserLetterTemplatesResetState = createAction(RESET_STATE);

export function efcUserLetterTemplatesFetch() {
  return dispatch => {
    dispatch(efcUserLetterTemplatesFetchStart());

    getEfcUserLetterTemplates()
      .done(allUsers => {
        dispatch(efcUserLetterTemplatesFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserLetterTemplatesFetchFail(error));
      });
  };
}
