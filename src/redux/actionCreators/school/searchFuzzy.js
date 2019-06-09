import { createAction } from 'redux-actions';
import { postSchoolSearchFuzzy } from 'api';

// Action type constants
export const FETCH_START = 'school/searchFuzzy/FETCH_START';
export const FETCH_SUCCESS = 'school/searchFuzzy/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/searchFuzzy/FETCH_FAIL';
export const RESET_STATE = 'school/searchFuzzy/RESET_STATE';

// Action objects
export const searchFuzzyFetchStart = createAction(FETCH_START);
export const searchFuzzyFetchSuccess = createAction(FETCH_SUCCESS);
export const searchFuzzyFetchFail = createAction(FETCH_FAIL);
export const searchFuzzyResetState = createAction(RESET_STATE);

export function searchFuzzyFetch(params) {
  return dispatch => {
    dispatch(searchFuzzyFetchStart());

    postSchoolSearchFuzzy(params)
      .done(payload => {
        dispatch(searchFuzzyFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(searchFuzzyFetchFail(error));
      });
  };
}
