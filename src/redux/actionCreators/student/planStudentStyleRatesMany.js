import { createAction } from 'redux-actions';
import { getStudentPlanStudentStyleRates } from 'api';

// Action type constants
export const FETCH_START = 'student/planStudentStyleRatesMany/FETCH_START';
export const FETCH_SUCCESS = 'student/planStudentStyleRatesMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planStudentStyleRatesMany/FETCH_FAIL';
export const RESET_STATE = 'student/planStudentStyleRatesMany/RESET_STATE';

// Action objects
export const studentPlanStudentStyleRatesManyFetchStart = createAction(
  FETCH_START
);
export const studentPlanStudentStyleRatesManyFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentPlanStudentStyleRatesManyFetchFail = createAction(
  FETCH_FAIL
);
export const studentPlanStudentStyleRatesManyResetState = createAction(
  RESET_STATE
);

export function studentPlanStudentStyleRatesManyFetch(planStudentId) {
  return dispatch => {
    dispatch(studentPlanStudentStyleRatesManyFetchStart({ id: planStudentId }));

    getStudentPlanStudentStyleRates(planStudentId)
      .done(payload => {
        dispatch(
          studentPlanStudentStyleRatesManyFetchSuccess({
            id: planStudentId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(studentPlanStudentStyleRatesManyFetchFail(error));
      });
  };
}
