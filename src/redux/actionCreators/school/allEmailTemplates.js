import { createAction } from 'redux-actions';
import { getSchoolAllEmailTemplates } from 'api';

// Action type constants
export const FETCH_START = 'school/allEmailTemplates/FETCH_START';
export const FETCH_SUCCESS = 'school/allEmailTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allEmailTemplates/FETCH_FAIL';
export const RESET_STATE = 'school/allEmailTemplates/RESET_STATE';

// Action objects
export const allEmailTemplatesFetchStart = createAction(FETCH_START);
export const allEmailTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const allEmailTemplatesFetchFail = createAction(FETCH_FAIL);
export const allEmailTemplatesResetState = createAction(RESET_STATE);

export function allEmailTemplatesFetch(id) {
  return dispatch => {
    dispatch(allEmailTemplatesFetchStart());

    getSchoolAllEmailTemplates(id)
      .done(payload => {
        dispatch(allEmailTemplatesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allEmailTemplatesFetchFail(error));
      });
  };
}
