import { createAction } from 'redux-actions';
import { getTemplatePlaceholders } from 'api';

// Action type constants
export const FETCH_START = 'utility/templatePlaceholders/FETCH_START';
export const FETCH_SUCCESS = 'utility/templatePlaceholders/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/templatePlaceholders/FETCH_FAIL';
export const RESET_STATE = 'utility/templatePlaceholders/RESET_STATE';

// Action objects
export const templatePlaceholdersFetchStart = createAction(FETCH_START);
export const templatePlaceholdersFetchSuccess = createAction(FETCH_SUCCESS);
export const templatePlaceholdersFetchFail = createAction(FETCH_FAIL);
export const templatePlaceholdersResetState = createAction(RESET_STATE);

export function templatePlaceholdersFetch() {
  return dispatch => {
    dispatch(templatePlaceholdersFetchStart());

    getTemplatePlaceholders()
      .done(payload => {
        dispatch(templatePlaceholdersFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(templatePlaceholdersFetchFail(error));
      });
  };
}
