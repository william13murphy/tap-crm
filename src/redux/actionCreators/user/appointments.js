import { createAction } from 'redux-actions';
import { getUserAppointments } from 'api';

// Action type constants
export const FETCH_START = 'user/appointments/FETCH_START';
export const FETCH_SUCCESS = 'user/appointments/FETCH_SUCCESS';
export const FETCH_FAIL = 'user/appointments/FETCH_FAIL';
export const RESET_STATE = 'user/appointments/RESET_STATE';

// Action objects
export const appointmentsFetchStart = createAction(FETCH_START);
export const appointmentsFetchSuccess = createAction(FETCH_SUCCESS);
export const appointmentsFetchFail = createAction(FETCH_FAIL);
export const appointmentsResetState = createAction(RESET_STATE);

export function appointmentsFetch(id) {
  return dispatch => {
    dispatch(appointmentsFetchStart());

    getUserAppointments(id)
      .done(user => {
        dispatch(appointmentsFetchSuccess(user));
      })
      .fail(error => {
        dispatch(appointmentsFetchFail(error));
      });
  };
}
