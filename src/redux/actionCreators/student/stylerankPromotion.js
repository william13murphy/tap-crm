import { createAction } from 'redux-actions';
import { saveStyleRankPromotion } from 'api';

// Action type constants
export const POST_START = 'student/promotionPost/POST_START';
export const POST_SUCCESS = 'student/promotionPost/POST_SUCCESS';
export const POST_FAIL = 'student/promotionPost/POST_FAIL';
export const FORM_RESET = 'student/promotionPost/FORM_RESET';

// Action objects
export const studentPromotionPostStart = createAction(POST_START);
export const studentPromotionPostSuccess = createAction(POST_SUCCESS);
export const studentPromotionPostFail = createAction(POST_FAIL);
export const studentPromotionPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPromotionPost(formData) {
  return dispatch => {
    dispatch(studentPromotionPostStart());

    saveStyleRankPromotion(formData)
      .done(() => {
        dispatch(studentPromotionPostSuccess());
      })
      .fail(error => {
        dispatch(studentPromotionPostFail(error));
      });
  };
}

