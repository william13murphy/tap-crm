import { createAction } from 'redux-actions';
import { postKioskCheckin } from 'api';

export const POST_START = 'kiosk/checkin/POST_START';
export const POST_SUCCESS = 'kiosk/checkin/POST_SUCCESS';
export const POST_FAIL = 'kiosk/checkin/POST_FAIL';
export const FORM_RESET = 'kiosk/checkin/FORM_RESET';

export const checkinPostStart = createAction(POST_START);
export const checkinPostSuccess = createAction(POST_SUCCESS);
export const checkinPostFail = createAction(POST_FAIL);
export const checkinResetState = createAction(FORM_RESET);

export function checkinPost(formData) {
  return dispatch => {
    dispatch(checkinPostStart());

    let { checkinClass } = formData;
    delete formData.checkinClass;

    postKioskCheckin(formData)
      .done(message => {
        let payload = {
          checkinClass,
          message,
        };

        dispatch(checkinPostSuccess(payload));
      })
      .fail(error => {
        dispatch(checkinPostFail());
      });
  };
}

export function checkinReset() {
  return dispatch => {
    dispatch(checkinResetState());
  };
}
