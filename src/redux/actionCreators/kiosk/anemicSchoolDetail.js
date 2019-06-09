import { createAction } from 'redux-actions';
import { getKioskAnemicSchoolDetail } from 'api';

// Action type constants
export const FETCH_START = 'kiosk/anemicSchoolDetail/FETCH_START';
export const FETCH_SUCCESS = 'kiosk/anemicSchoolDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'kiosk/anemicSchoolDetail/FETCH_FAIL';
export const RESET_STATE = 'kiosk/anemicSchoolDetail/RESET_STATE';

// Action objects
export const kioskAnemicSchoolDetailFetchStart = createAction(FETCH_START);
export const kioskAnemicSchoolDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const kioskAnemicSchoolDetailFetchFail = createAction(FETCH_FAIL);
export const kioskAnemicSchoolDetailResetState = createAction(RESET_STATE);

export function kioskAnemicSchoolDetailFetch(id) {
  return dispatch => {
    dispatch(kioskAnemicSchoolDetailFetchStart());

    getKioskAnemicSchoolDetail(id)
      .done(schoolDetail => {
        dispatch(kioskAnemicSchoolDetailFetchSuccess(schoolDetail));
      })
      .fail(error => {
        dispatch(kioskAnemicSchoolDetailFetchFail(error));
      });
  };
}
