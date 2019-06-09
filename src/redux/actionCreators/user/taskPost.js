import { createAction } from 'redux-actions';
import { createUserTask, updateUserTask } from 'api';

// Action type constants
export const POST_START = 'user/taskPost/POST_START';
export const POST_SUCCESS = 'user/taskPost/POST_SUCCESS';
export const POST_FAIL = 'user/taskPost/POST_FAIL';
export const FORM_RESET = 'user/taskPost/FORM_RESET';

// Action objects
export const userTaskPostStart = createAction(POST_START);
export const userTaskPostSuccess = createAction(POST_SUCCESS);
export const userTaskPostFail = createAction(POST_FAIL);
export const userTaskPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function userTaskCreate(formData) {
  return dispatch => {
    dispatch(userTaskPostStart());

    createUserTask(formData)
      .done(payload => {
        dispatch(userTaskPostSuccess(payload));
      })
      .fail(error => {
        dispatch(userTaskPostFail(error));
      });
  };
}

export function userTaskUpdate(formData) {
  return dispatch => {
    dispatch(userTaskPostStart());

    updateUserTask(formData)
      .done(payload => {
        dispatch(userTaskPostSuccess(payload));
      })
      .fail(error => {
        dispatch(userTaskPostFail(error));
      });
  };
}
