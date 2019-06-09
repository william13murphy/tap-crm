import { emptyFetchState, emptyFormState } from './emptyState';
import { reducer as formReducer } from 'redux-form';
import { navInitialState, navReducer } from './reducers/nav';
import { screenInitialState, screenReducer } from './reducers/screen';
import { clientInitialState, clientReducer } from './reducers/client';
import { schoolInitialState, schoolReducer } from './reducers/school';
import { utilityInitialState, utilityReducer } from './reducers/utility';
import { userInitialState, userReducer } from './reducers/user';
import { posInitialState, posReducer } from './reducers/pos';
import { kioskInitialState, kioskReducer } from './reducers/kiosk';
import { studentInitialState, studentReducer } from './reducers/student';
import { reportInitialState, reportReducer } from './reducers/report';
import { tokenInitialState, tokenReducer } from './reducers/token';
import { APP_API_RESET_STATE } from 'src/redux/actionCreators/app';
import { log } from 'log';
import {
  administrationInitialState,
  administrationReducer,
} from './reducers/administration';
import {
  appContextInitialState,
  appContextReducer,
} from './reducers/appContext';

export default () => {
  const initialState: {} = {
    // Application State
    form: {},
    appContext: Object.assign({}, appContextInitialState),
    nav: Object.assign({}, navInitialState),
    screen: Object.assign({}, screenInitialState), // API Data State
    administration: Object.assign({}, administrationInitialState),
    client: Object.assign({}, clientInitialState),
    school: Object.assign({}, schoolInitialState),
    token: Object.assign({}, tokenInitialState),
    user: Object.assign({}, userInitialState),
    utility: Object.assign({}, utilityInitialState),
    pos: Object.assign({}, posInitialState),
    kiosk: Object.assign({}, kioskInitialState),
    student: Object.assign({}, studentInitialState),
    report: Object.assign({}, reportInitialState),
  };

  const app = (state, action) => {
    // Inital state
    if (typeof state === 'undefined') {
      log('RETURNING INITIAL STATE', initialState);
      return initialState;
    }
    switch (action.type) {
      case APP_API_RESET_STATE: {
        const appApiFreshState = Object.assign({}, state, {
          // Reset api state:
          administration: Object.assign({}, administrationInitialState),
          client: Object.assign({}, clientInitialState),
          kiosk: Object.assign({}, kioskInitialState),
          pos: Object.assign({}, posInitialState),
          report: Object.assign({}, reportInitialState),
          school: Object.assign({}, schoolInitialState), // *required*
          student: Object.assign({}, studentInitialState),
          user: Object.assign({}, userInitialState),
          utility: Object.assign({}, utilityInitialState), // *required*
        });
        return appApiFreshState;
      }
    }
    return {
      // app state
      appContext: appContextReducer(state.appContext, action),
      form: formReducer(state.form, action),
      nav: navReducer(state.nav, action),
      screen: screenReducer(state.screen, action),

      token: tokenReducer(state.token, action),
      user: userReducer(state.user, action),
      // api state
      administration: administrationReducer(state.administration, action),
      client: clientReducer(state.client, action),
      kiosk: kioskReducer(state.kiosk, action),
      pos: posReducer(state.pos, action),
      report: reportReducer(state.report, action),
      school: schoolReducer(state.school, action),
      student: studentReducer(state.student, action),
      utility: utilityReducer(state.utility, action),
    };
  };
  return app;
};
