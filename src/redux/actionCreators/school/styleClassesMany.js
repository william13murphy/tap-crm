import { createAction } from 'redux-actions';
import { getSchoolStyleClasses } from 'api';

// Action type constants
export const FETCH_START = 'school/styleClassesMany/FETCH_START';
export const FETCH_SUCCESS = 'school/styleClassesMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleClassesMany/FETCH_FAIL';
export const RESET_STATE = 'school/styleClassesMany/RESET_STATE';

// Action objects
export const schoolStyleClassesManyFetchStart = createAction(FETCH_START);
export const schoolStyleClassesManyFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleClassesManyFetchFail = createAction(FETCH_FAIL);
export const schoolStyleClassesManyResetState = createAction(RESET_STATE);

export function schoolStyleClassesManyFetch(schoolStyleId) {
  return dispatch => {
    dispatch(schoolStyleClassesManyFetchStart({ id: schoolStyleId }));

    getSchoolStyleClasses(schoolStyleId)
      .done(payload => {
        dispatch(
          schoolStyleClassesManyFetchSuccess({
            id: schoolStyleId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(schoolStyleClassesManyFetchFail(error));
      });
  };
}
