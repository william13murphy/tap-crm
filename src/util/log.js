import { getEnvironmentVariables } from 'util/environment';

// Don't need configureScope if everything is passed into withScope call:
// Sentry.configureScope(scope => {
//   scope.setUser({ id: token.UserId, username: token.UserName });
//   scope.setTag(`Role: ${token.Role}`, `Locale: ${window.locale}`);
// });

// Log error to Sentry (private)
const logErrorToSentry = (error, info, token) => {
  // Sentry.withScope(scope => {
  //   if (info) {
  //     Object.keys(info).forEach(key => {
  //       scope.setExtra(key, info[key]);
  //     });
  //   }
  //   if (token) {
  //     scope.setUser({ id: token.UserId, username: token.UserName });
  //     scope.setTag('Role', token.Role);
  //     scope.setTag('UserId', token.UserId);
  //     scope.setTag('UserName', token.UserName);
  //   }
  //   scope.setTag('Locale', window.locale);
  //   Sentry.captureException(error);
  //   // Sentry.showReportDialog(); // TODO: Troubleshoot why this request is "pending" indefinitely.
  //   // TODO: Add Stack Trace ("info" paramter)
  //   // TODO: Abbreviate Breadcrumbs (Console logs) to prevent 413 / pending "file too big" errors
  // });
};

// Log error to console (private)
const logErrorToConsole = (error, info) => {
  console.log('Error: ', error);
  if (info) {
    console.log('Error Stack Trace', info);
  }
};

const logError = function(error, info, token) {
  const productionEnvironment = getEnvironmentVariables().productionEnvironment;
  if (productionEnvironment) {
    logErrorToSentry(error, info, token);
  }

  logErrorToConsole(error, info, token);
};

export { logError };
export { log };

const log = (...params) => {
  const productionEnvironment = getEnvironmentVariables().productionEnvironment;
  if (!productionEnvironment) {
    console.log(...params);
  }
};


