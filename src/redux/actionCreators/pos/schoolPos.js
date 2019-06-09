import { createAction } from 'redux-actions';
import { getSchoolPos } from 'api';

// Action type constants
export const FETCH_START = 'pos/schoolPos/FETCH_START';
export const FETCH_SUCCESS = 'pos/schoolPos/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/schoolPos/FETCH_FAIL';
export const RESET_STATE = 'pos/schoolPos/RESET_STATE';

// Action objects
export const schoolPosFetchStart = createAction(FETCH_START);
export const schoolPosFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolPosFetchFail = createAction(FETCH_FAIL);
export const schoolPosResetState = createAction(RESET_STATE);

export function schoolPosFetch(id) {
  return dispatch => {
    dispatch(schoolPosFetchStart());

    getSchoolPos(id)
      .done(payload => {
        dispatch(schoolPosFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolPosFetchFail(error));
      });
  };
}
// export function schoolPosReset() {
//   return dispatch => {
//     dispatch(schoolPosResetState());
//   };
// }
