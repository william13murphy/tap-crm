import { createAction } from 'redux-actions';
import { saveStudentOwner } from 'api';

// Action Type Constants

// Change the accountOwner to the ownerPost
export const POST_START = 'student/accountOwner/POST_START';
export const POST_SUCCESS = 'student/accountOwner/POST_SUCCESS';
export const POST_FAIL = 'student/accountOwner/POST_FAIl';
export const FORM_RESET = 'student/accountOwner/FORM_RESET';

// Action Objects
export const ownerPostStart = createAction(POST_START);
export const ownerPostSuccess = createAction(POST_SUCCESS);
export const ownerPostFail = createAction(POST_FAIL);
export const ownerPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function ownerPost(formData) {
  return dispatch => {
    dispatch(ownerPostStart());

    saveStudentOwner(formData)
      .done(id => {
        dispatch(ownerPostSuccess(id));
      })
      .fail(error => {
        dispatch(ownerPostFail(error));
      });
  };
}
