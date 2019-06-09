import { createAction } from 'redux-actions';
import { postSchoolAllSearchFuzzy } from 'api';
import { allSearchFuzzyUpdate } from 'src/redux/actionCreators/school/allSearchFuzzyUpdate';

// Action type constants
export const POST_START = 'school/allSearchFuzzy/POST_START';
export const POST_SUCCESS = 'school/allSearchFuzzy/POST_SUCCESS';
export const POST_FAIL = 'school/allSearchFuzzy/POST_FAIL';
export const FORM_RESET = 'school/allSearchFuzzy/FORM_RESET';

// Action objects
export const allSearchFuzzyPostStart = createAction(POST_START);
export const allSearchFuzzyPostSuccess = createAction(POST_SUCCESS);
export const allSearchFuzzyPostFail = createAction(POST_FAIL);
export const allSearchFuzzyResetState = createAction(FORM_RESET);

// Thunk action objects
export function allSearchFuzzyPost(params) {
  return dispatch => {
    dispatch(allSearchFuzzyPostStart());

    postSchoolAllSearchFuzzy(params)
      .done(payload => {
        dispatch(allSearchFuzzyPostSuccess(payload));
        dispatch(allSearchFuzzyUpdate(payload));
      })
      .fail(error => {
        dispatch(allSearchFuzzyPostFail(error));
      });
  };
}

export function allSearchFuzzyReset() {
  return dispatch => {
    dispatch(allSearchFuzzyResetState());
  };
}
