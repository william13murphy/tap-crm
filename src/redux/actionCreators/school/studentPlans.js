import { createAction } from 'redux-actions';
import { getSchoolStudentPlans } from 'api';

// Action type constants
export const FETCH_START = 'school/studentPlans/FETCH_START';
export const FETCH_SUCCESS = 'school/studentPlans/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/studentPlans/FETCH_FAIL';
export const RESET_STATE = 'school/studentPlans/RESET_STATE';

// Action objects
export const schoolStudentPlansFetchStart = createAction(FETCH_START);
export const schoolStudentPlansFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStudentPlansFetchFail = createAction(FETCH_FAIL);
export const schoolStudentPlansResetState = createAction(RESET_STATE);

export function schoolStudentPlansFetch(id: string) {
  return dispatch => {
    dispatch(schoolStudentPlansFetchStart());

    getSchoolStudentPlans((id: string))
      .done(schoolStudentPlans => {
        dispatch(schoolStudentPlansFetchSuccess(schoolStudentPlans));
      })
      .fail(error => {
        dispatch(schoolStudentPlansFetchFail(error));
      });
  };
}
