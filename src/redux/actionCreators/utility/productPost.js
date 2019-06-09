import { createAction } from 'redux-actions';
import { createProduct, updateProduct } from 'api';

// Action type constants
export const POST_START = 'utility/productPost/POST_START';
export const POST_SUCCESS = 'utility/productPost/POST_SUCCESS';
export const POST_FAIL = 'utility/productPost/POST_FAIL';
export const FORM_RESET = 'utility/productPost/FORM_RESET';

// Action objects
export const productPostStart = createAction(POST_START);
export const productPostSuccess = createAction(POST_SUCCESS);
export const productPostFail = createAction(POST_FAIL);
export const productFormReset = createAction(FORM_RESET);

// Thunk action objects
export function productCreate(formData) {
  return dispatch => {
    dispatch(productPostStart());

    createProduct(formData)
      .done(() => {
        dispatch(productPostSuccess());
      })
      .fail(error => {
        dispatch(productPostFail(error));
      });
  };
}

export function productUpdate(formData) {
  return dispatch => {
    dispatch(productPostStart());

    updateProduct(formData)
      .done(() => {
        dispatch(productPostSuccess());
      })
      .fail(error => {
        dispatch(productPostFail(error));
      });
  };
}
