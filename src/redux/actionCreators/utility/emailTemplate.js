import { createAction } from 'redux-actions';
import { getEmailTemplate } from 'api';

// Action type constants
export const FETCH_START = 'utility/emailTemplate/FETCH_START';
export const FETCH_SUCCESS = 'utility/emailTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/emailTemplate/FETCH_FAIL';
export const RESET_STATE = 'utility/emailTemplate/RESET_STATE';

// Action objects
export const emailTemplateFetchStart = createAction(FETCH_START);
export const emailTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const emailTemplateFetchFail = createAction(FETCH_FAIL);
export const emailTemplateResetState = createAction(RESET_STATE);

export function emailTemplateFetch(id) {
  return dispatch => {
    dispatch(emailTemplateFetchStart());

    getEmailTemplate(id)
      .done(payload => {
        dispatch(emailTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(emailTemplateFetchFail(error));
      });
  };
}

export function emailTemplateReset() {
  return dispatch => {
    dispatch(emailTemplateResetState());
  };
}
