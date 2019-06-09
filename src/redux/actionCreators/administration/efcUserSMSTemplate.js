import { createAction } from 'redux-actions';
import { getEfcUserSMSTemplate } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserSMSTemplate/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserSMSTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserSMSTemplate/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserSMSTemplate/RESET_STATE';

// Action objects
export const efcUserSMSTemplateFetchStart = createAction(FETCH_START);
export const efcUserSMSTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserSMSTemplateFetchFail = createAction(FETCH_FAIL);
export const efcUserSMSTemplateResetState = createAction(RESET_STATE);

export function efcUserSMSTemplateFetch(id) {
  return dispatch => {
    dispatch(efcUserSMSTemplateFetchStart());

    getEfcUserSMSTemplate(id)
      .done(allUsers => {
        dispatch(efcUserSMSTemplateFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserSMSTemplateFetchFail(error));
      });
  };
}
