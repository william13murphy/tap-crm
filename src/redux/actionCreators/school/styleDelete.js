import { createAction } from 'redux-actions';
import { deleteSchoolStyle } from 'api';

// Action type constants
export const POST_START = 'school/styleDelete/POST_START';
export const POST_SUCCESS = 'school/styleDelete/POST_SUCCESS';
export const POST_FAIL = 'school/styleDelete/POST_FAIL';
export const FORM_RESET = 'school/styleDelete/FORM_RESET';

// Action objects
export const styleDeleteStart = createAction(POST_START);
export const styleDeleteSuccess = createAction(POST_SUCCESS);
export const styleDeleteFail = createAction(POST_FAIL);
export const styleDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function styleDelete(id) {
  return dispatch => {
    dispatch(styleDeleteStart());

    deleteSchoolStyle(id)
      .done(payload => {
        dispatch(styleDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(styleDeleteFail(error));
      });
  };
}
