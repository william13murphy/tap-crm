import { createAction } from 'redux-actions';
import { getSchoolStyleRanks } from 'api';

// Action type constants
export const FETCH_START = 'school/styleRanks/FETCH_START';
export const FETCH_SUCCESS = 'school/styleRanks/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleRanks/FETCH_FAIL';
export const RESET_STATE = 'school/styleRanks/RESET_STATE';

// Action objects
export const schoolStyleRanksFetchStart = createAction(FETCH_START);
export const schoolStyleRanksFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleRanksFetchFail = createAction(FETCH_FAIL);
export const schoolStyleRanksResetState = createAction(RESET_STATE);

export function schoolStyleRanksFetch(id: string) {
  return dispatch => {
    dispatch(schoolStyleRanksFetchStart());

    getSchoolStyleRanks((id: string))
      .done(schoolStyleRanks => {
        dispatch(schoolStyleRanksFetchSuccess(schoolStyleRanks));
      })
      .fail(error => {
        dispatch(schoolStyleRanksFetchFail(error));
      });
  };
}
