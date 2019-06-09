import { createAction } from 'redux-actions';
import { getDeclineByDate } from 'api';
import moment from 'moment';

// Action type constants
export const FETCH_START = 'report/declineByDate/FETCH_START';
export const FETCH_SUCCESS = 'report/declineByDate/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/declineByDate/FETCH_FAIL';
export const RESET_STATE = 'report/declineByDate/RESET_STATE';

// Action objects
export const declineByDateFetchStart = createAction(FETCH_START);
export const declineByDateFetchSuccess = createAction(FETCH_SUCCESS);
export const declineByDateFetchFail = createAction(FETCH_FAIL);
export const declineByDateResetState = createAction(RESET_STATE);

const createModel = payload => {
  const dataKeys = Object.keys(payload).map((cV, i) => {
    return moment(cV).format('MMM-DD');
  });
  const model = Object.values(payload).map((cV, i) => {
    return {
      name: dataKeys[i],
      DeclinedPayments: cV,
    };
  });
  return model;
};

export function declineByDateFetch(id: string) {
  return dispatch => {
    dispatch(declineByDateFetchStart());

    getDeclineByDate((id: string))
      .done(payload => {
        dispatch(declineByDateFetchSuccess(createModel(payload)));
      })
      .fail(error => {
        dispatch(declineByDateFetchFail(error));
      });
  };
}
