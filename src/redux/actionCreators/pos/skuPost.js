import { createAction } from 'redux-actions';
import { skuCreate } from 'api';

// Action type constants
export const POST_START = 'pos/skuPost/POST_START';
export const POST_SUCCESS = 'pos/skuPost/POST_SUCCESS';
export const POST_FAIL = 'pos/skuPost/POST_FAIL';
export const FORM_RESET = 'pos/skuPost/FORM_RESET';

// Action objects
export const skuPostStart = createAction(POST_START);
export const skuPostSuccess = createAction(POST_SUCCESS);
export const skuPostFail = createAction(POST_FAIL);
export const skuPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function skuPost(formData) {
  return dispatch => {
    dispatch(skuPostStart());

    skuCreate(formData)
      .done(payload => {
        dispatch(skuPostSuccess(payload));
      })
      .fail(error => {
        dispatch(skuPostFail(error));
      });
  };
}
