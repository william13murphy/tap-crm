import { createAction } from 'redux-actions';
import { getSchoolEmailTemplate } from 'api';

// Action type constants
export const FETCH_START = 'school/emailTemplate/FETCH_START';
export const FETCH_SUCCESS = 'school/emailTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/emailTemplate/FETCH_FAIL';
export const RESET_STATE = 'school/emailTemplate/RESET_STATE';

// Action objects
export const emailTemplateFetchStart = createAction(FETCH_START);
export const emailTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const emailTemplateFetchFail = createAction(FETCH_FAIL);
export const emailTemplateResetState = createAction(RESET_STATE);

export function emailTemplateFetch(id) {
  return dispatch => {
    dispatch(emailTemplateFetchStart());

    getSchoolEmailTemplate(id)
      .done(payload => {
        dispatch(emailTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(emailTemplateFetchFail(error));
      });
  };
}
