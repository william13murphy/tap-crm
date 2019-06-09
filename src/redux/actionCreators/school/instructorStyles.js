import { createAction } from 'redux-actions';
import { getSchoolInstructorStyles } from 'api';

// Action type constants
export const FETCH_START = 'school/instructorStyles/FETCH_START';
export const FETCH_SUCCESS = 'school/instructorStyles/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/instructorStyles/FETCH_FAIL';
export const RESET_STATE = 'school/instructorStyles/RESET_STATE';

// Action objects
export const schoolInstructorStylesFetchStart = createAction(FETCH_START);
export const schoolInstructorStylesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolInstructorStylesFetchFail = createAction(FETCH_FAIL);
export const schoolInstructorStylesResetState = createAction(RESET_STATE);

export function schoolInstructorStylesFetch(schoolId) {
  return dispatch => {
    dispatch(schoolInstructorStylesFetchStart());

    getSchoolInstructorStyles(schoolId)
      .done(payload => {
        dispatch(schoolInstructorStylesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolInstructorStylesFetchFail(error));
      });
  };
}
