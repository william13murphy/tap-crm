import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRedux from './Redux';
import { getEnvironmentVariables } from 'util/environment';
import * as serviceWorker from './serviceWorker';

// NOTE: This file is currently deprecated; see indexNoHot.

// Get global environment variables for the app:
const environment = getEnvironmentVariables();

// App <- Redux <- Routes <- Layout <- Screen

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(AppRedux);

// serviceWorker.register();

if (module.hot) {
  module.hot.accept();
}
