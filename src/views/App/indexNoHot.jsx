import { getEnvironmentVariables } from 'util/environment';
import { log } from 'log';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import AppRedux from './Redux';

const environment = getEnvironmentVariables();
log('%c>>> Environment: ', 'color: magenta', environment);

// Sentry / Raven configuration:
// Sentry.init({
//   dsn: 'https://b73c7df876c0456db5e6bd2383d25e38@sentry.io/1299148',
//   release: 'v0.0.1',
//   environment: environment.name,
//   // integrations: [new MyAwesomeIntegration()]
// });

if(localStorage.getItem('monitoringOn')) {
  const LogRocket = require('logrocket');
  LogRocket.init('pfngu8/tap-dev');
  const setupLogRocketReact = require('logrocket-react');
  setupLogRocketReact(LogRocket);
}

serviceWorker.register();

ReactDOM.render(<AppRedux />, document.getElementById('app'));
