import { createAction } from 'redux-actions';
import { getSMSTemplate } from 'api';

// Action type constants
export const FETCH_START = 'utility/smsTemplate/FETCH_START';
export const FETCH_SUCCESS = 'utility/smsTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/smsTemplate/FETCH_FAIL';
export const RESET_STATE = 'utility/smsTemplate/RESET_STATE';

// Action objects
export const smsTemplateFetchStart = createAction(FETCH_START);
export const smsTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const smsTemplateFetchFail = createAction(FETCH_FAIL);
export const smsTemplateResetState = createAction(RESET_STATE);

export function smsTemplateFetch(id) {
  return dispatch => {
    dispatch(smsTemplateFetchStart());

    getSMSTemplate(id)
      .done(payload => {
        dispatch(smsTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(smsTemplateFetchFail(error));
      });
  };
}

export function smsTemplateReset() {
  return dispatch => {
    dispatch(smsTemplateResetState());
  };
}
