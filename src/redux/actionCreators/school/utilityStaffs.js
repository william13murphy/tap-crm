import { createAction } from 'redux-actions';
import { getSchoolUtilityStaffs } from 'api';

// Action type constants
export const FETCH_START = 'school/utilityStaffs/FETCH_START';
export const FETCH_SUCCESS = 'school/utilityStaffs/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/utilityStaffs/FETCH_FAIL';
export const RESET_STATE = 'school/utilityStaffs/RESET_STATE';

// Action objects
export const schoolUtilityStaffsFetchStart = createAction(FETCH_START);
export const schoolUtilityStaffsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolUtilityStaffsFetchFail = createAction(FETCH_FAIL);
export const schoolUtilityStaffsResetState = createAction(RESET_STATE);

export function schoolUtilityStaffsFetch(schoolId) {
  return dispatch => {
    dispatch(schoolUtilityStaffsFetchStart());

    getSchoolUtilityStaffs(schoolId)
      .done(payload => {
        dispatch(schoolUtilityStaffsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolUtilityStaffsFetchFail(error));
      });
  };
}
