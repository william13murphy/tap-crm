// @flow
import React from 'react';

// Redux
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createApp from 'src/redux/app';
import Entry from './Entry';

declare var window: any;

const reduxApp = createApp();

const composeWithDevTools = function() {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(
      applyMiddleware(thunk),
      window.devToolsExtension && window.devToolsExtension()
    );
  } else {
    return applyMiddleware(thunk);
  }
};

export const store = createStore(reduxApp, composeWithDevTools());
// const store = createStore(reduxApp, window.devToolsExtension && window.devToolsExtension());

const AppRedux = () => {
  return (
    <ReduxProvider store={store}>
      <Entry />
    </ReduxProvider>
  );
};

export default AppRedux;
