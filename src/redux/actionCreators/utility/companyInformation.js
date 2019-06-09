import { createAction } from 'redux-actions';
import { getCompanyInformation } from 'api';

// Action type constants
export const FETCH_START = 'utility/companyInformation/FETCH_START';
export const FETCH_SUCCESS = 'utility/companyInformation/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/companyInformation/FETCH_FAIL';
export const RESET_STATE = 'utility/companyInformation/RESET_STATE';

// Action objects
export const companyInformationFetchStart = createAction(FETCH_START);
export const companyInformationFetchSuccess = createAction(FETCH_SUCCESS);
export const companyInformationFetchFail = createAction(FETCH_FAIL);
export const companyInformationResetState = createAction(RESET_STATE);

export function companyInformationFetch() {
  return dispatch => {
    dispatch(companyInformationFetchStart());

    getCompanyInformation()
      .done(payload => {
        dispatch(companyInformationFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(companyInformationFetchFail(error));
      });
  };
}
