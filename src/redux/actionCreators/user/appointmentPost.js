import { createAction } from 'redux-actions';
import { createUserAppointment, updateUserAppointment } from 'api';

// Action type constants
export const POST_START = 'user/appointmentPost/POST_START';
export const POST_SUCCESS = 'user/appointmentPost/POST_SUCCESS';
export const POST_FAIL = 'user/appointmentPost/POST_FAIL';
export const FORM_RESET = 'user/appointmentPost/FORM_RESET';

// Action objects
export const userAppointmentPostStart = createAction(POST_START);
export const userAppointmentPostSuccess = createAction(POST_SUCCESS);
export const userAppointmentPostFail = createAction(POST_FAIL);
export const userAppointmentPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function userAppointmentCreate(formData) {
  return dispatch => {
    dispatch(userAppointmentPostStart());

    createUserAppointment(formData)
      .done(payload => {
        dispatch(userAppointmentPostSuccess(payload));
      })
      .fail(error => {
        dispatch(userAppointmentPostFail(error));
      });
  };
}

export function userAppointmentUpdate(formData) {
  return dispatch => {
    dispatch(userAppointmentPostStart());

    updateUserAppointment(formData)
      .done(payload => {
        dispatch(userAppointmentPostSuccess(payload));
      })
      .fail(error => {
        dispatch(userAppointmentPostFail(error));
      });
  };
}
