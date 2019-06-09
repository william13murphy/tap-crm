import { createAction } from 'redux-actions';
import { getSchoolAddresses } from 'api';

// Action type constants
export const FETCH_START = 'school/addresses/FETCH_START';
export const FETCH_SUCCESS = 'school/addresses/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/addresses/FETCH_FAIL';
export const RESET_STATE = 'school/addresses/RESET_STATE';

// Action objects
export const schoolAddressesFetchStart = createAction(FETCH_START);
export const schoolAddressesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolAddressesFetchFail = createAction(FETCH_FAIL);
export const schoolAddressesResetState = createAction(RESET_STATE);

export function schoolAddressesFetch(id: string) {
  return dispatch => {
    dispatch(schoolAddressesFetchStart());

    getSchoolAddresses((id: string))
      .done(schoolAddresses => {
        dispatch(schoolAddressesFetchSuccess(schoolAddresses));
      })
      .fail(error => {
        dispatch(schoolAddressesFetchFail(error));
      });
  };
}
