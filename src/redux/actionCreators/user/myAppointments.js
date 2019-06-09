import { createAction } from 'redux-actions';
import { getUserMyAppointments } from 'api';

// Action type constants
export const FETCH_START = 'user/myAppointments/FETCH_START';
export const FETCH_SUCCESS = 'user/myAppointments/FETCH_SUCCESS';
export const FETCH_FAIL = 'user/myAppointments/FETCH_FAIL';
export const RESET_STATE = 'user/myAppointments/RESET_STATE';

// Action objects
export const myAppointmentsFetchStart = createAction(FETCH_START);
export const myAppointmentsFetchSuccess = createAction(FETCH_SUCCESS);
export const myAppointmentsFetchFail = createAction(FETCH_FAIL);
export const myAppointmentsResetState = createAction(RESET_STATE);

export function myAppointmentsFetch(id) {
  return dispatch => {
    dispatch(myAppointmentsFetchStart());

    getUserMyAppointments(id)
      .done(user => {
        dispatch(myAppointmentsFetchSuccess(user));
      })
      .fail(error => {
        dispatch(myAppointmentsFetchFail(error));
      });
  };
}
