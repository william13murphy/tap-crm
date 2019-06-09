import { createAction } from 'redux-actions';
import { getKioskFindByName } from 'api';

// Action type constants
export const FETCH_START = 'school/findByName/FETCH_START';
export const FETCH_SUCCESS = 'school/findByName/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/findByName/FETCH_FAIL';
export const RESET_STATE = 'school/findByName/RESET_STATE';

// Action objects
export const findByNameFetchStart = createAction(FETCH_START);
export const findByNameFetchSuccess = createAction(FETCH_SUCCESS);
export const findByNameFetchFail = createAction(FETCH_FAIL);
export const findByNameResetState = createAction(RESET_STATE);

export function findByNameFetch(schoolId) {
  return dispatch => {
    dispatch(findByNameFetchStart());

    getKioskFindByName(schoolId)
      .done(payload => {
        dispatch(findByNameFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(findByNameFetchFail(error));
      });
  };
}
