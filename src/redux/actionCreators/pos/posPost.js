import { createAction } from 'redux-actions';
import { posCreate } from 'api';

// Action type constants
export const POST_START = 'pos/posPost/POST_START';
export const POST_SUCCESS = 'pos/posPost/POST_SUCCESS';
export const POST_FAIL = 'pos/posPost/POST_FAIL';
export const FORM_RESET = 'pos/posPost/FORM_RESET';

// Action objects
export const posPostStart = createAction(POST_START);
export const posPostSuccess = createAction(POST_SUCCESS);
export const posPostFail = createAction(POST_FAIL);
export const posPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function posPost(formData) {
  return dispatch => {
    dispatch(posPostStart());

    posCreate(formData)
      .done(payload => {
        dispatch(posPostSuccess(payload));
      })
      .fail(error => {
        dispatch(posPostFail(error));
      });
  };
}
