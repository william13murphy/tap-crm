import { createAction } from 'redux-actions';
import { getSchoolStyleRateAdditionalClasses } from 'api';

// Action type constants
export const FETCH_START = 'school/styleRateAdditionalClassesMany/FETCH_START';
export const FETCH_SUCCESS =
  'school/styleRateAdditionalClassesMany/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleRateAdditionalClassesMany/FETCH_FAIL';
export const RESET_STATE = 'school/styleRateAdditionalClassesMany/RESET_STATE';

// Action objects
export const schoolStyleRateAdditionalClassesFetchStart = createAction(
  FETCH_START
);
export const schoolStyleRateAdditionalClassesFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolStyleRateAdditionalClassesFetchFail = createAction(
  FETCH_FAIL
);
export const schoolStyleRateAdditionalClassesManyResetState = createAction(
  RESET_STATE
);

export function schoolStyleRateAdditionalClassesFetch(params: {
  styleRateId: string,
  schoolId: string,
}) {
  return dispatch => {
    dispatch(schoolStyleRateAdditionalClassesFetchStart());

    getSchoolStyleRateAdditionalClasses((params: string))
      .done(payload => {
        dispatch(
          schoolStyleRateAdditionalClassesFetchSuccess({
            id: params.styleRateId,
            data: payload,
          })
        );
      })
      .fail(error => {
        dispatch(schoolStyleRateAdditionalClassesFetchFail(error));
      });
  };
}
