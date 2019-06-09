import React from 'react';
import { Route, Redirect } from 'react-router';

import Module from 'components/Layout/Module';

import CheckinFormContainer from 'containers/Kiosk/CheckinFormContainer';
import KioskSessionStorageTokenContainer from 'containers/Kiosk/KioskSessionStorageTokenContainer';

import CheckInPage from './CheckIn';
import AuthenticatePage from './Authenticate';
import LoginPage from './Login';
import './styles.less';

class KioskModule extends React.Component {
  props: KioskModuleProps;

  render() {
    return (
      <Module className="KioskModule">
        <KioskSessionStorageTokenContainer>
          <Route
            exact={true}
            path="/kiosk"
            render={() => <Redirect to="/kiosk/login" />}
          />
          <Route
            path="/kiosk/checkin"
            render={() => {
              return (
                <CheckinFormContainer>
                  <CheckInPage />
                </CheckinFormContainer>
              );
            }}
          />
          <Route
            path="/kiosk/authenticate"
            render={() => {
              return <AuthenticatePage />;
            }}
          />
          <Route
            path="/kiosk/login"
            render={() => {
              return <LoginPage />;
            }}
          />
        </KioskSessionStorageTokenContainer>
      </Module>
    );
  }
}

export default KioskModule;
