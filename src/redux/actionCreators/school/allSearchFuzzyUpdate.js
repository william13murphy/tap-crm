import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'school/allSearchFuzzyUpdate/FETCH_START';
export const FETCH_SUCCESS = 'school/allSearchFuzzyUpdate/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allSearchFuzzyUpdate/FETCH_FAIL';
export const RESET_STATE = 'school/allSearchFuzzyUpdate/RESET_STATE';

// Action objects
export const allSearchFuzzyUpdateFetchStart = createAction(FETCH_START);
export const allSearchFuzzyUpdateFetchSuccess = createAction(FETCH_SUCCESS);
export const allSearchFuzzyUpdateFetchFail = createAction(FETCH_FAIL);
export const allSearchFuzzyUpdateResetState = createAction(RESET_STATE);

export function allSearchFuzzyUpdate(payload) {
  return dispatch => {
    dispatch(allSearchFuzzyUpdateFetchSuccess(payload));
  };
}
