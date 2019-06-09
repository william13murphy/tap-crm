import { createAction } from 'redux-actions';
import { getStudentPlanStudentStyleRateClasses } from 'api';

// Action type constants
export const FETCH_START =
  'student/planStudentStyleRateClassesMany/FETCH_START';
export const FETCH_SUCCESS =
  'student/planStudentStyleRateClassesMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planStudentStyleRateClassesMany/FETCH_FAIL';
export const RESET_STATE =
  'student/planStudentStyleRateClassesMany/RESET_STATE';

// Action objects
export const studentPlanStudentStyleRateClassesManyFetchStart = createAction(
  FETCH_START
);
export const studentPlanStudentStyleRateClassesManyFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentPlanStudentStyleRateClassesManyFetchFail = createAction(
  FETCH_FAIL
);
export const studentPlanStudentStyleRateClassesManyResetState = createAction(
  RESET_STATE
);

export function studentPlanStudentStyleRateClassesManyFetch(
  planStudentStyleRateId
) {
  return dispatch => {
    dispatch(
      studentPlanStudentStyleRateClassesManyFetchStart({
        id: planStudentStyleRateId,
      })
    );

    getStudentPlanStudentStyleRateClasses(planStudentStyleRateId)
      .done(payload => {
        dispatch(
          studentPlanStudentStyleRateClassesManyFetchSuccess({
            id: planStudentStyleRateId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(studentPlanStudentStyleRateClassesManyFetchFail(error));
      });
  };
}
