import { createAction } from 'redux-actions';
import { getUserAppointmentDetail } from 'api';

// Action type constants
export const FETCH_START = 'user/appointmentDetail/FETCH_START';
export const FETCH_SUCCESS = 'user/appointmentDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'user/appointmentDetail/FETCH_FAIL';
export const RESET_STATE = 'user/appointmentDetail/RESET_STATE';

// Action objects
export const userAppointmentDetailFetchStart = createAction(FETCH_START);
export const userAppointmentDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const userAppointmentDetailFetchFail = createAction(FETCH_FAIL);
export const userAppointmentDetailResetState = createAction(RESET_STATE);

export function userAppointmentDetailFetch(id) {
  return dispatch => {
    dispatch(userAppointmentDetailFetchStart());

    getUserAppointmentDetail(id)
      .done(data => {
        dispatch(userAppointmentDetailFetchSuccess(data));
      })
      .fail(error => {
        dispatch(userAppointmentDetailFetchFail(error));
      });
  };
}
