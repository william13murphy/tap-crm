import { createAction } from 'redux-actions';
import { getStudentStyleRank } from 'api';

export const FETCH_START = 'student/styleRank/FETCH_START';
export const FETCH_SUCCESS = 'student/styleRank/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/styleRank/FETCH_FAIL';
export const RESET_STATE = 'student/styleRank/RESET_STATE';

export const studentStyleRankFetchStart = createAction(FETCH_START);
export const studentStyleRankFetchSuccess = createAction(FETCH_SUCCESS);
export const studentStyleRankFetchFail = createAction(FETCH_FAIL);
export const studentStyleRankResetState = createAction(RESET_STATE);

export function studentStyleRankFetch(id: string) {
  return dispatch => {
    dispatch(studentStyleRankFetchStart());

    getStudentStyleRank((id: string))
      .done(payload => {
        dispatch(studentStyleRankFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentStyleRankFetchFail(error));
      });
  };
}
