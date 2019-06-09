import { createAction } from 'redux-actions';
import { getSchoolAllOutbox } from 'api';

// Action type constants
export const FETCH_START = 'school/allOutbox/FETCH_START';
export const FETCH_SUCCESS = 'school/allOutbox/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allOutbox/FETCH_FAIL';
export const RESET_STATE = 'school/allOutbox/RESET_STATE';

// Action objects
export const allOutboxFetchStart = createAction(FETCH_START);
export const allOutboxFetchSuccess = createAction(FETCH_SUCCESS);
export const allOutboxFetchFail = createAction(FETCH_FAIL);
export const allOutboxResetState = createAction(RESET_STATE);

export function allOutboxFetch(id) {
  return dispatch => {
    dispatch(allOutboxFetchStart());

    getSchoolAllOutbox(id)
      .done(payload => {
        dispatch(allOutboxFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allOutboxFetchFail(error));
      });
  };
}
