import { createAction } from 'redux-actions';
import { getEfcUserLetterTemplate } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserLetterTemplate/FETCH_START';
export const FETCH_SUCCESS =
  'administration/efcUserLetterTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserLetterTemplate/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserLetterTemplate/RESET_STATE';

// Action objects
export const efcUserLetterTemplateFetchStart = createAction(FETCH_START);
export const efcUserLetterTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserLetterTemplateFetchFail = createAction(FETCH_FAIL);
export const efcUserLetterTemplateResetState = createAction(RESET_STATE);

export function efcUserLetterTemplateFetch(id) {
  return dispatch => {
    dispatch(efcUserLetterTemplateFetchStart());

    getEfcUserLetterTemplate(id)
      .done(allUsers => {
        dispatch(efcUserLetterTemplateFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserLetterTemplateFetchFail(error));
      });
  };
}
