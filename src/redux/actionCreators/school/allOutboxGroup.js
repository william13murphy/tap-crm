import { createAction } from 'redux-actions';
import { getSchoolAllOutboxGroup } from 'api';

// Action Type Constants
export const FETCH_START = 'school/allOutboxGroup/FETCH_START';
export const FETCH_SUCCESS = 'school/allOutboxGroup/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allOutboxGroup/FETCH_FAIL';
export const RESET_STATE = 'school/allOutboxGroup/RESET_STATE';

// Action Objects
export const allOutboxGroupFetchStart = createAction(FETCH_START);
export const allOutboxGroupFetchSuccess = createAction(FETCH_SUCCESS);
export const allOutboxGroupFetchFail = createAction(FETCH_FAIL);
export const allOutboxGroupResetState = createAction(RESET_STATE);

export function allOutboxGroupFetch(id: string) {
  return dispatch => {
    dispatch(allOutboxGroupFetchStart());

    getSchoolAllOutboxGroup((id: string))
      .done(allOutboxGroup => {
        dispatch(allOutboxGroupFetchSuccess(allOutboxGroup));
      })
      .fail(error => {
        dispatch(allOutboxGroupFetchFail(error));
      });
  };
}
