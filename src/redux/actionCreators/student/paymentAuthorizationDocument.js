import { createAction } from 'redux-actions';
import { getStudentPaymentAuthorization } from 'api';

// Action type constants
export const FETCH_START = 'student/paymentAuthorizationDocument/FETCH_START';
export const FETCH_SUCCESS =
  'student/paymentAuthorizationDocument/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/paymentAuthorizationDocument/FETCH_FAIL';
export const RESET_STATE = 'student/paymentAuthorizationDocument/RESET_STATE';

// Action objects
export const studentPaymentAuthorizationDocumentFetchStart = createAction(
  FETCH_START
);
export const studentPaymentAuthorizationDocumentFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentPaymentAuthorizationDocumentFetchFail = createAction(
  FETCH_FAIL
);
export const studentPaymentAuthorizationDocumentResetState = createAction(
  RESET_STATE
);

export function studentPaymentAuthorizationDocumentFetch(id: string) {
  return dispatch => {
    dispatch(studentPaymentAuthorizationDocumentFetchStart());

    getStudentPaymentAuthorization((id: string))
      .done(Authorization => {
        dispatch(
          studentPaymentAuthorizationDocumentFetchSuccess(Authorization)
        );
      })
      .fail(error => {
        dispatch(studentPaymentAuthorizationDocumentFetchFail(error));
      });
  };
}
