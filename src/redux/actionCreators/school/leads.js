import { createAction } from 'redux-actions';
import { getSchoolLeads } from 'api';

// Action type constants
export const FETCH_START = 'school/leads/FETCH_START';
export const FETCH_SUCCESS = 'school/leads/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/leads/FETCH_FAIL';
export const RESET_STATE = 'school/leads/RESET_STATE';

// Action objects
export const schoolLeadsFetchStart = createAction(FETCH_START);
export const schoolLeadsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolLeadsFetchFail = createAction(FETCH_FAIL);
export const schoolLeadsResetState = createAction(RESET_STATE);

export function schoolLeadsFetch(id: string) {
  return dispatch => {
    dispatch(schoolLeadsFetchStart());

    getSchoolLeads((id: string))
      .done(schoolLeads => {
        dispatch(schoolLeadsFetchSuccess(schoolLeads));
      })
      .fail(error => {
        dispatch(schoolLeadsFetchFail(error));
      });
  };
}
