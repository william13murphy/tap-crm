import { createAction } from 'redux-actions';
import { postKioskAuthenticate } from 'api';

export const POST_START = 'kiosk/authenticate/POST_START';
export const POST_SUCCESS = 'kiosk/authenticate/POST_SUCCESS';
export const POST_FAIL = 'kiosk/authenticate/POST_FAIL';
export const FORM_RESET = 'kiosk/authenticate/FORM_RESET';

export const authenticatePostStart = createAction(POST_START);
export const authenticatePostSuccess = createAction(POST_SUCCESS);
export const authenticatePostFail = createAction(POST_FAIL);
export const authenticateResetState = createAction(FORM_RESET);

export function authenticatePost(formData) {
  return dispatch => {
    dispatch(authenticatePostStart());
    postKioskAuthenticate(formData)
      .done(payload => {
        dispatch(authenticatePostSuccess(payload));
      })
      .fail(error => {
        dispatch(
          authenticatePostFail({
            responseText: 'Invalid Student ID/Student Name',
            responseJSON: {},
            status: error.status,
            statusText: error.statusText,
          })
        );
      });
  };
}

export function authenticateReset() {
  return dispatch => {
    dispatch(authenticateResetState());
  };
}
