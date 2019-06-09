import React from 'react';
import { Route, Redirect } from 'react-router';

import connect from 'src/redux/connect';

import { authorizeRole } from 'util/auth/roles';

import { getCachedToken } from 'util/token';

/* PrivateRoute: Wrap a component in a PrivateComponent, and pass in the allowed roles
 * as the `allow` parameter.
 * PrivateComponent will allow/deny entry based on if the role is authorized to view it.
 *
 * Use PrivateRoute for routes of the app where you want to deny entry for unauthorized roles.
 * PrivateRoute will kick the user out of that page, and return a 401 error.
 * For smaller sections of the app, where you want to hide/show a component but not kick the user out,
 * instead use `PrivateComponent`.
 *
 * Example usage:
 *
 *  import { roles } from 'util/auth/roles';
 *
 *  <PrivateRoute
 *    allow={roles.LEVEL_CLADMIN}
 *    component={MyComponent}
 *  />
 */

type PrivateRouteProps = {
  component: React.Element<any>,
  allow: [],
  token: string,
  redirect: boolean, // Redirect to login if unauthorized
};

const RedirectOrNull = props => {
  if (props.redirect) {
    return (
      <Redirect
        to={{
          pathname: '/error/401',
        }}
      />
    );
  } else {
    return null;
  }
};

const PrivateRoute = ({
  component: Component,
  allow,
  token,
  redirect,
  ...rest
}: PrivateRouteProps) => {
  let authorized = false;
  // Fetch cached token if exists.
  const cachedToken = getCachedToken();
  if (cachedToken && cachedToken !== null) {
    if (allow) {
      authorized = authorizeRole(cachedToken.Role, allow);
    }
  }
  if (token.payload && token.payload !== null) {
    if (allow) {
      authorized = authorizeRole(token.payload.Role, allow);
    }
  }

  return (
    <Route
      {...rest}
      render={componentProps =>
        authorized ? (
          <Component {...componentProps} />
        ) : (
          <RedirectOrNull redirect={redirect} />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(
  PrivateRoute,
  mapStateToProps
);
