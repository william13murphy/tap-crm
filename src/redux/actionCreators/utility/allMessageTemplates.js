import { createAction } from 'redux-actions';
import { getAllMessageTemplates } from 'api';

// Action type constants
export const FETCH_START = 'utility/allMessageTemplates/FETCH_START';
export const FETCH_SUCCESS = 'utility/allMessageTemplates/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/allMessageTemplates/FETCH_FAIL';
export const RESET_STATE = 'utility/allMessageTemplates/RESET_STATE';

// Action objects
export const allMessageTemplatesFetchStart = createAction(FETCH_START);
export const allMessageTemplatesFetchSuccess = createAction(FETCH_SUCCESS);
export const allMessageTemplatesFetchFail = createAction(FETCH_FAIL);
export const allMessageTemplatesResetState = createAction(RESET_STATE);

export function allMessageTemplatesFetch() {
  return dispatch => {
    dispatch(allMessageTemplatesFetchStart());

    getAllMessageTemplates()
      .done(payload => {
        dispatch(allMessageTemplatesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allMessageTemplatesFetchFail(error));
      });
  };
}
