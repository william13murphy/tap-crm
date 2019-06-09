import { createAction } from 'redux-actions';
import { getEfcUserEmailTemplates } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserEmailTemplates/FETCH_START';
export const FETCH_SUCCESS =
  'administration/efcUserEmailTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserEmailTemplates/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserEmailTemplates/RESET_STATE';

// Action objects
export const efcUserEmailTemplatesFetchStart = createAction(FETCH_START);
export const efcUserEmailTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserEmailTemplatesFetchFail = createAction(FETCH_FAIL);
export const efcUserEmailTemplatesResetState = createAction(RESET_STATE);

export function efcUserEmailTemplatesFetch() {
  return dispatch => {
    dispatch(efcUserEmailTemplatesFetchStart());

    getEfcUserEmailTemplates()
      .done(allUsers => {
        dispatch(efcUserEmailTemplatesFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserEmailTemplatesFetchFail(error));
      });
  };
}
