import { createAction } from 'redux-actions';
import { getAllReferences } from 'api';
import { getEnvironmentVariables } from 'util/environment';

// Action type constants
export const FETCH_START = 'references/FETCH_START';
export const FETCH_SUCCESS = 'references/FETCH_SUCCESS';
export const FETCH_FAIL = 'references/FETCH_FAIL';

// Action objects
export const referencesFetchStart = createAction(FETCH_START);
export const referencesFetchSuccess = createAction(FETCH_SUCCESS);
export const referencesFetchFail = createAction(FETCH_FAIL);

// Session storage cache
export function setSessionStorageReferences(payload) {
  window.sessionStorage.setItem('references', JSON.stringify(payload));
}

export function getSessionStorageReferences() {
  if (window.sessionStorage.references) {
    return JSON.parse(window.sessionStorage.references);
  } else {
    return false;
  }
}

// Fetch thunk
export function referencesFetch() {
  const productionEnvironment = getEnvironmentVariables().productionEnvironment;

  return dispatch => {
    dispatch(referencesFetchStart());

    const sessionStorageReferences = getSessionStorageReferences();

    if (sessionStorageReferences) {
      dispatch(referencesFetchSuccess(sessionStorageReferences));
    } else {
      getAllReferences()
        .done(payload => {
          setSessionStorageReferences(payload);
          dispatch(referencesFetchSuccess(payload));
        })
        .fail(error => {
          dispatch(referencesFetchFail(error));
        });
    }
  };
}
