import { createAction } from 'redux-actions';
import { getEfcUserSMSTemplates } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserSMSTemplates/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserSMSTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserSMSTemplates/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserSMSTemplates/RESET_STATE';

// Action objects
export const efcUserSMSTemplatesFetchStart = createAction(FETCH_START);
export const efcUserSMSTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserSMSTemplatesFetchFail = createAction(FETCH_FAIL);
export const efcUserSMSTemplatesResetState = createAction(RESET_STATE);

export function efcUserSMSTemplatesFetch() {
  return dispatch => {
    dispatch(efcUserSMSTemplatesFetchStart());

    getEfcUserSMSTemplates()
      .done(allUsers => {
        dispatch(efcUserSMSTemplatesFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserSMSTemplatesFetchFail(error));
      });
  };
}
