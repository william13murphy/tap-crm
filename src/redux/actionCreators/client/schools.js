import { createAction } from 'redux-actions';
import { getClientSchools } from 'api';

// Action type constants
export const FETCH_START = 'client/schools/FETCH_START';
export const FETCH_SUCCESS = 'client/schools/FETCH_SUCCESS';
export const FETCH_FAIL = 'client/schools/FETCH_FAIL';
export const RESET_STATE = 'client/schools/RESET_STATE';

// Action objects
export const clientSchoolsFetchStart = createAction(FETCH_START);
export const clientSchoolsFetchSuccess = createAction(FETCH_SUCCESS);
export const clientSchoolsFetchFail = createAction(FETCH_FAIL);
export const clientSchoolsResetState = createAction(RESET_STATE);

export function clientSchoolsFetch(id: string) {
  return dispatch => {
    dispatch(clientSchoolsFetchStart());

    getClientSchools((id: string))
      .done(clientSchools => {
        dispatch(clientSchoolsFetchSuccess(clientSchools));
      })
      .fail(error => {
        dispatch(clientSchoolsFetchFail(error));
      });
  };
}
