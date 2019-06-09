import { Cmd, loop } from 'redux-loop';
import { getType } from 'typesafe-actions';
import * as actions from '../../actionCreators/report/healthStats';
import { postSchoolHealth } from 'api';

export const initialState = {
  leads: 0,
  unpaids: 0,
  birthdays: 0,
  upcomingGradings: 0,
  messages: 0,
  softexits: 0,
  renewals: 0,
  errorMsg: '',
  error: null,
};

const fetchHealthStat = data => {
  return postSchoolHealth(data);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case getType(actions.fetchStat):
      return loop(
        state,
        Cmd.run(fetchHealthStat, {
          args: [action.payload],
          successActionCreator: actions.statFetchSuccesful,
          failActionCreator: actions.statFetchFailed,
        })
      );
    case getType(actions.statFetchSuccesful):
      return {
        ...state,
        ...action.payload,
      };
    case getType(actions.statFetchFailed): {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
