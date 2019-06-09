import {
  getCookieSchoolId,
  APPCONTEXT_SET_SCHOOLID_STATE,
} from 'src/redux/actionCreators/appContext';

export const appContextInitialState = {
  schoolId: '', // getCookieSchoolId(),
};

export const appContextReducer = (state, action) => {
  switch (action.type) {
    case APPCONTEXT_SET_SCHOOLID_STATE: {
      return Object.assign({}, state, {
        schoolId: action.payload,
      });
    }
    default:
      return state;
  }
};
