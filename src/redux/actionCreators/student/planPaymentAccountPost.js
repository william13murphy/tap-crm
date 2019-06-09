import { createAction } from 'redux-actions';
import { savePlanPaymentAccount } from 'api';

// Action Type Constants
export const POST_START = 'student/planPaymentAccountPost/POST_START';
export const POST_SUCCESS = 'student/planPaymentAccountPost/POST_SUCCESS';
export const POST_FAIL = 'student/planPaymentAccountPost/POST_FAIl';
export const FORM_RESET = 'student/planPaymentAccountPost/FORM_RESET';

// Action Objects
export const planPaymentAccountPostStart = createAction(POST_START);
export const planPaymentAccountPostSuccess = createAction(POST_SUCCESS);
export const planPaymentAccountPostFail = createAction(POST_FAIL);
export const planPaymentAccountPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function planPaymentAccountPost(formData) {
  return dispatch => {
    dispatch(planPaymentAccountPostStart());

    savePlanPaymentAccount(formData)
      .done(id => {
        dispatch(planPaymentAccountPostSuccess(id));
      })
      .fail(error => {
        dispatch(planPaymentAccountPostFail(error));
      });
  };
}
