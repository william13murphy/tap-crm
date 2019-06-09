import { createAction } from 'redux-actions';
import { getSchoolAllSMSTemplates } from 'api';

// Action type constants
export const FETCH_START = 'school/allSMSTemplates/FETCH_START';
export const FETCH_SUCCESS = 'school/allSMSTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allSMSTemplates/FETCH_FAIL';
export const RESET_STATE = 'school/allSMSTemplates/RESET_STATE';

// Action objects
export const allSMSTemplatesFetchStart = createAction(FETCH_START);
export const allSMSTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const allSMSTemplatesFetchFail = createAction(FETCH_FAIL);
export const allSMSTemplatesResetState = createAction(RESET_STATE);

export function allSMSTemplatesFetch(id) {
  return dispatch => {
    dispatch(allSMSTemplatesFetchStart());

    getSchoolAllSMSTemplates(id)
      .done(payload => {
        dispatch(allSMSTemplatesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allSMSTemplatesFetchFail(error));
      });
  };
}
