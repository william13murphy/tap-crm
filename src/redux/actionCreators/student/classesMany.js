import { createAction } from 'redux-actions';
import { getStudentClasses } from 'api';

// Action type constants
export const FETCH_START = 'student/classesMany/FETCH_START';
export const FETCH_SUCCESS = 'student/classesMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/classesMany/FETCH_FAIL';
export const RESET_STATE = 'student/classesMany/RESET_STATE';

// Action objects
export const studentClassesManyFetchStart = createAction(FETCH_START);
export const studentClassesManyFetchSuccess = createAction(FETCH_SUCCESS);
export const studentClassesManyFetchFail = createAction(FETCH_FAIL);
export const studentClassesManyResetState = createAction(RESET_STATE);

export function studentClassesManyFetch(id: string) {
  return dispatch => {
    dispatch(studentClassesManyFetchStart({ id }));

    getStudentClasses((id: string))
      .done(studentClasses => {
        dispatch(
          studentClassesManyFetchSuccess({
            id: id,
            data: studentClasses,
          })
        );
      })
      .fail(error => {
        dispatch(studentClassesManyFetchFail(error));
      });
  };
}
