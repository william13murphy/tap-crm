import { createAction } from 'redux-actions';
import { getSchoolStyleRate } from 'api';

// Action type constants
export const FETCH_START = 'school/styleRateMany/FETCH_START';
export const FETCH_SUCCESS = 'school/styleRateMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleRateMany/FETCH_FAIL';
export const RESET_STATE = 'school/styleRateMany/RESET_STATE';

// Action objects
export const schoolStyleRateManyFetchStart = createAction(FETCH_START);
export const schoolStyleRateManyFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleRateManyFetchFail = createAction(FETCH_FAIL);
export const schoolStyleRateManyResetState = createAction(RESET_STATE);

export function schoolStyleRateManyFetch(id) {
  return dispatch => {
    dispatch(schoolStyleRateManyFetchStart());

    getSchoolStyleRate(id)
      .done(payload => {
        dispatch(
          schoolStyleRateManyFetchSuccess({
            id: id,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(schoolStyleRateManyFetchFail(error));
      });
  };
}
