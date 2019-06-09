import { createAction } from 'redux-actions';
import { postOrder } from 'api';

// Action type constants
export const POST_START = 'pos/orderPost/POST_START';
export const POST_SUCCESS = 'pos/orderPost/POST_SUCCESS';
export const POST_FAIL = 'pos/orderPost/POST_FAIL';
export const FORM_RESET = 'pos/orderPost/FORM_RESET';

// Action objects
export const orderPostStart = createAction(POST_START);
export const orderPostSuccess = createAction(POST_SUCCESS);
export const orderPostFail = createAction(POST_FAIL);
export const orderFormReset = createAction(FORM_RESET);

// Thunk action objects
export function orderPost(formData) {
  return dispatch => {
    dispatch(orderPostStart());

    postOrder(formData)
      .done(payload => {
        dispatch(orderPostSuccess(payload));
      })
      .fail(error => {
        dispatch(orderPostFail(error));
      });
  };
}
