import React from 'react';
import { Route } from 'react-router';

// Router
import { BrowserRouter, Redirect } from 'react-router-dom';

import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';

// Root-level Entry Components
import EFCApp from 'views/EFCApp';
import SchoolApp from 'views/SchoolApp';
import StudentApp from 'views/StudentApp';

import Login from 'views/App/Login';
import Kiosk from 'views/App/Kiosk';
import Error from 'views/App/Error';
import CreatePassword from 'views/App/Password/CreatePassword';

// Global Components
import Screen from './Screen';
import LogOutRedirect from 'components/Auth/LogOutRedirect';

// Global Styles

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import 'styles/_reset.less';
import 'styles/styles.less';

import SessionStorageTokenContainer from 'containers/SessionStorageTokenContainer';

const Entry = () => {
  const localeName = 'locale__' + window.locale || 'locale__none';
  return (
    <BrowserRouter basename="/">
      <div className={`App ${localeName}`}>
        <SessionStorageTokenContainer>
          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/login" />}
          />
          <PrivateRoute
            path="/app"
            component={EFCApp}
            allow={roles.SUBSET_EFC_STAFF}
          />
          <PrivateRoute
            path="/app"
            component={SchoolApp}
            allow={roles.SUBSET_SCHOOL_STAFF}
          />
          <PrivateRoute
            path="/app"
            component={StudentApp}
            allow={roles.STUDENT}
          />
          <Route path="/login" component={Login} />
          <Route path="/kiosk" component={Kiosk} />
          <Route path="/password/create/:id" component={CreatePassword} />
          <Route path="/error" component={Error} />
          <Route path="/app" component={LogOutRedirect} />
          <Screen />
        </SessionStorageTokenContainer>
      </div>
    </BrowserRouter>
  );
};

export default Entry;
