import { createAction } from 'redux-actions';
import { appApiResetState } from './app';

export const APPCONTEXT_GET_SCHOOLID = 'appContext/GET_SCHOOLID';
export const APPCONTEXT_SET_SCHOOLID = 'appContext/SET_SCHOOLID';
export const APPCONTEXT_SET_SCHOOLID_STATE = 'appContext/SET_SCHOOLID_STATE';
export const appContextSetSchoolIdState = createAction(
  APPCONTEXT_SET_SCHOOLID_STATE
);

export function appContextGetSchoolId(defaultId) {
  schoolId = defaultId;

  return dispatch => {
    dispatch(appContextSetSchoolIdState(schoolId));
  };
}

export function appContextSetSchoolId(id) {
  return dispatch => {
    dispatch(appApiResetState());
    dispatch(appContextSetSchoolIdState(id));
  };
}
