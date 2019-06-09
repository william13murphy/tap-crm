import { createAction } from 'redux-actions';
import { getSchoolStudentListDetail } from 'src/api/school';

// Action type constants
export const FETCH_START = 'school/studentListDetail/FETCH_START';
export const FETCH_SUCCESS = 'school/studentListDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/studentListDetail/FETCH_FAIL';
export const RESET_STATE = 'school/studentListDetail/RESET_STATE';

// Action objects
export const studentListDetailFetchStart = createAction(FETCH_START);
export const studentListDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const studentListDetailFetchFail = createAction(FETCH_FAIL);
export const studentListDetailResetState = createAction(RESET_STATE);

// Create a model from the returned data:
const createModel = studentListDetail => {
  const model = studentListDetail;
  return model;
};

export function studentListDetailFetch(id) {
  return dispatch => {
    dispatch(studentListDetailFetchStart());

    getSchoolStudentListDetail(id)
      .done(studentListDetail => {
        const model = createModel(studentListDetail);
        dispatch(studentListDetailFetchSuccess(model));
      })
      .fail(error => {
        dispatch(studentListDetailFetchFail(error));
      });
  };
}
