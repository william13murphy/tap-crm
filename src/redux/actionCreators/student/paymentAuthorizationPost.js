import { createAction } from 'redux-actions';

import { updateStudentPaymentAuthorization } from 'api';
import { putStudentPlanFinalize } from 'api';
import { getStudentPlanDetail } from 'api';

// Action type constants
export const POST_START = 'student/paymentAuthorization/POST_START';
export const POST_SUCCESS = 'student/paymentAuthorization/POST_SUCCESS';
export const POST_FAIL = 'student/paymentAuthorization/POST_FAIL';
export const FORM_RESET = 'student/paymentAuthorizationPost/FORM_RESET';

// Action objects
export const studentPaymentAuthorizationPostStart = createAction(POST_START);
export const studentPaymentAuthorizationPostSuccess = createAction(
  POST_SUCCESS
);
export const studentPaymentAuthorizationPostFail = createAction(POST_FAIL);
export const studentPaymentAuthorizationPostFormReset = createAction(
  FORM_RESET
);

export function studentPaymentAuthorizationPost(data) {
  return dispatch => {
    dispatch(studentPaymentAuthorizationPostStart());

    updateStudentPaymentAuthorization(data.signatureData)
      .done(() => {
        getStudentPlanDetail(data.signatureData.PlanId)
          .done(() => {
            putStudentPlanFinalize(data.signatureData.PlanId)
              .done(() => {
                dispatch(studentPaymentAuthorizationPostSuccess());
              })
              .fail(error => {
                dispatch(studentPaymentAuthorizationPostFail(error));
              });
          })
          .fail(error => {
            dispatch(studentPaymentAuthorizationPostFail(error));
          });
      })
      .fail(error => {
        dispatch(studentPaymentAuthorizationPostFail(error));
      });
  };
}
