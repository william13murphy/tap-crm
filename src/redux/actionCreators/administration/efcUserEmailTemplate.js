import { createAction } from 'redux-actions';
import { getEfcUserEmailTemplate } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserEmailTemplate/FETCH_START';
export const FETCH_SUCCESS =
  'administration/efcUserEmailTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserEmailTemplate/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserEmailTemplate/RESET_STATE';

// Action objects
export const efcUserEmailTemplateFetchStart = createAction(FETCH_START);
export const efcUserEmailTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserEmailTemplateFetchFail = createAction(FETCH_FAIL);
export const efcUserEmailTemplateResetState = createAction(RESET_STATE);

export function efcUserEmailTemplateFetch(id) {
  return dispatch => {
    dispatch(efcUserEmailTemplateFetchStart());

    getEfcUserEmailTemplate(id)
      .done(allUsers => {
        dispatch(efcUserEmailTemplateFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserEmailTemplateFetchFail(error));
      });
  };
}
