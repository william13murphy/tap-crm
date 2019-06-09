import { log } from 'log';

// Test the token for role-specific attributes, such as SchoolId.
// If using the token from redux, you must pass in the `token.payload`.
const tokenRoleTest = token => {
  const role = token.Role;
  if (role === 'SCHADMIN' || role === 'INSTRUCT' || role === 'STUDENT') {
    if (token.SchoolId) {
      return {
        valid: true,
      };
    } else {
      log(
        '%cError: (tokenRoleTest) Token is missing the SchoolId attribute.',
        'color: red'
      );
      return {
        valid: false,
        error: 'Token is missing the SchoolId attribute.',
      };
    }
  } else {
    // No checks for other roles.
    return {
      valid: true,
    };
  }
};

const tokenTest = token => {
  if (token.errorObject) {
    if (token.errorObject.statusText === 'error') {
      log('Login Error: The server timed out.');
      return {
        valid: false,
        error: 'The server timed out.',
      };
    } else {
      log('Login Error: ', token.errorObject.statusText);
      return {
        valid: false,
        error:
          token.errorObject.responseJSON &&
          token.errorObject.responseJSON.error_description,
      };
    }
  } else {
    if (token.Role) {
      return tokenRoleTest(token);
    } else {
      log('%cLogin Error: Token is missing the Role attribute.', 'color: red');
      return {
        valid: false,
        error: 'Token is missing the Role attribute.',
      };
    }
  }
};

export default tokenTest;
