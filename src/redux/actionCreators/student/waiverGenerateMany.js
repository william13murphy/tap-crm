import { createAction } from 'redux-actions';
import { getStudentWaiverGenerate } from 'api';

// Action type constants
export const FETCH_START = 'student/waiverGenerateMany/FETCH_START';
export const FETCH_SUCCESS = 'student/waiverGenerateMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/waiverGenerateMany/FETCH_FAIL';
export const RESET_STATE = 'student/waiverGenerateMany/RESET_STATE';

// Action objects
export const studentWaiverGenerateManyFetchStart = createAction(FETCH_START);
export const studentWaiverGenerateManyFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentWaiverGenerateManyFetchFail = createAction(FETCH_FAIL);
export const studentWaiverGenerateManyResetState = createAction(RESET_STATE);

export function studentWaiverGenerateManyFetch(studentId) {
  return dispatch => {
    dispatch(studentWaiverGenerateManyFetchStart({ id: studentId }));

    getStudentWaiverGenerate(studentId)
      .done(payload => {
        dispatch(
          studentWaiverGenerateManyFetchSuccess({
            id: studentId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(studentWaiverGenerateManyFetchFail(error));
      });
  };
}
