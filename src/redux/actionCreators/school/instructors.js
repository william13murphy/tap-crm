import { createAction } from 'redux-actions';
import { getSchoolInstructors } from 'api';

// Action type constants
export const FETCH_START = 'school/instructors/FETCH_START';
export const FETCH_SUCCESS = 'school/instructors/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/instructors/FETCH_FAIL';
export const RESET_STATE = 'school/instructors/RESET_STATE';

// Action objects
export const schoolInstructorsFetchStart = createAction(FETCH_START);
export const schoolInstructorsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolInstructorsFetchFail = createAction(FETCH_FAIL);
export const schoolInstructorsResetState = createAction(RESET_STATE);

export function schoolInstructorsFetch(id: string) {
  return dispatch => {
    dispatch(schoolInstructorsFetchStart());

    getSchoolInstructors((id: string))
      .done(schoolInstructors => {
        dispatch(schoolInstructorsFetchSuccess(schoolInstructors));
      })
      .fail(error => {
        dispatch(schoolInstructorsFetchFail(error));
      });
  };
}
