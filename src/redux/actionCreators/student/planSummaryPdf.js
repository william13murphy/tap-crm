import { createAction } from 'redux-actions';
import { getStudentPlanSummaryPdf } from 'api';

// Action type constants
export const FETCH_START = 'student/planSummaryPdf/FETCH_START';
export const FETCH_SUCCESS = 'student/planSummaryPdf/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planSummaryPdf/FETCH_FAIL';
export const RESET_STATE = 'student/planSummaryPdf/RESET_STATE';

// Action objects
export const studentPlanSummaryPdfFetchStart = createAction(FETCH_START);
export const studentPlanSummaryPdfFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanSummaryPdfFetchFail = createAction(FETCH_FAIL);
export const studentPlanSummaryPdfResetState = createAction(RESET_STATE);

export function studentPlanSummaryPdfFetch(id: string) {
  return dispatch => {
    dispatch(studentPlanSummaryPdfFetchStart());

    getStudentPlanSummaryPdf((id: string))
      .done(payload => {
        dispatch(studentPlanSummaryPdfFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPlanSummaryPdfFetchFail(error));
      });
  };
}
