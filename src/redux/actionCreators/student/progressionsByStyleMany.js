import { createAction } from 'redux-actions';
import { getStudentStyleRankProgressionsByStyle } from 'api';

// Action type constants
export const FETCH_START = 'student/progressionsByStyleMany/FETCH_START';
export const FETCH_SUCCESS = 'student/progressionsByStyleMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/progressionsByStyleMany/FETCH_FAIL';
export const RESET_STATE = 'student/progressionsByStyleMany/RESET_STATE';

// Action objects
export const studentProgressionsByStyleManyFetchStart = createAction(
  FETCH_START
);
export const studentProgressionsByStyleManyFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentProgressionsByStyleManyFetchFail = createAction(FETCH_FAIL);
export const studentProgressionsByStyleManyResetState = createAction(
  RESET_STATE
);

export function studentProgressionsByStyleManyFetch(params: {
  studentId: string,
  schoolId: string,
  schoolStyleId: string,
}) {
  return dispatch => {
    dispatch(
      studentProgressionsByStyleManyFetchStart({ id: params.schoolStyleId })
    );

    getStudentStyleRankProgressionsByStyle((params: string))
      .done(payload => {
        dispatch(
          studentProgressionsByStyleManyFetchSuccess({
            id: params.schoolStyleId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(studentProgressionsByStyleManyFetchFail(error));
      });
  };
}
