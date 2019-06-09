import React from 'react';
import connect from 'src/redux/connect';
import { authorizeRole } from 'util/auth/roles';
import ErrorBoundary from 'components/ErrorBoundary';

/* PrivateComponent: Wrap a component in a PrivateComponent, and pass in the allowed roles
 * as the `allow` parameter.
 * PrivateComponent will allow/deny entry based on if the role's authorization.
 *
 * Use PrivateComponent for areas of the app where you don't want to completely deny entry (401).
 * For route-based authorization, use `PrivateRoute` instead.
 *
 * Example usage:
 *
 *  import { roles } from 'util/auth/roles';
 *
 *  <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
 *    <MyComponent />
 *  </PrivateComponent>
 */

type PrivateComponentProps = {
  allow: boolean, // allow/deny entry based on role. Example: `allow={roles.SUBSET_SCHOOL_STAFF}
  children: React.DOMElement<any>,
};

const PrivateComponent = (props: PrivateComponentProps) => {
  if (authorizeRole(props.role, props.allow) === true) {
    // if an allow prop is passed in, only render if it is "true"
    return <ErrorBoundary>{props.children}</ErrorBoundary>;
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    role: state.token.payload.Role,
  };
};

export default connect(PrivateComponent, mapStateToProps);
