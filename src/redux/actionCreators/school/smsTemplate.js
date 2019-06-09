import { createAction } from 'redux-actions';
import { getSchoolSMSTemplate } from 'api';

// Action type constants
export const FETCH_START = 'school/smsTemplate/FETCH_START';
export const FETCH_SUCCESS = 'school/smsTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/smsTemplate/FETCH_FAIL';
export const RESET_STATE = 'school/smsTemplate/RESET_STATE';

// Action objects
export const smsTemplateFetchStart = createAction(FETCH_START);
export const smsTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const smsTemplateFetchFail = createAction(FETCH_FAIL);
export const smsTemplateResetState = createAction(RESET_STATE);

export function smsTemplateFetch(id) {
  return dispatch => {
    dispatch(smsTemplateFetchStart());

    getSchoolSMSTemplate(id)
      .done(payload => {
        dispatch(smsTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(smsTemplateFetchFail(error));
      });
  };
}
