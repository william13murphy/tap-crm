import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import { tokenPost, POST_START } from 'src/redux/actionCreators/token';
import { phaseOneRoles } from 'util/auth/roles';
import {
  getEnvironmentName,
  ENV_SANDBOX,
  ENV_PRODUCTION,
} from 'util/environment/name';

import Module from 'components/Layout/Module';
import Page from 'components/Layout/Page';
import Modal from 'components/Modal';

import LoginFormContainer from 'containers/Utility/LoginFormContainer';
import LoginForm from './LoginForm';
import RequestPasswordForm from './RequestPasswordForm';
import RequestPasswordFormContainer from 'containers/Utility/RequestPasswordFormContainer';
import './styles.less';

const MODAL_PATH = '/login/request-password';
const CLOSE_URL = '/login';
const KIOSK_LOGIN = '/kiosk';

type LoginProps = {
  token: {
    status: any,
  },
  dispatchTokenPost: any,
};

class Login extends React.Component {
  props: LoginProps;
  constructor() {
    super();

    this.state = {
      prepopulatedUserName: 'girish66',
      hideQuickLogin: this.hideQuickLogin(),
    };
  }
  hideQuickLogin = () => {
    const envName = getEnvironmentName();
    if (envName === ENV_SANDBOX || envName === ENV_PRODUCTION) {
      return true;
    } else {
      return false;
    }
  };
  setPrepopulatedUserName = e => {
    this.props.dispatchTokenPost({
      userName: e.target.id,
      password: 'testdb99!!',
    });
  };
  renderPrepopulatedUserNames() {
    return (
      <div className="QuickLogin">
        {phaseOneRoles.map((cV, i) => {
          let role = cV;
          if (role === 'SUPERUSER') {
            role = 'superuser@efc.com';
          }
          if (i < 4) {
            return (
              <div key={i}>
                {i === 0 && <div className="QuickLogin__label">EFC Users</div>}
                {i === 4 && (
                  <div className="QuickLogin__label">External Users</div>
                )}
                <button
                  className="QuickLogin__button pt-button"
                  id={role}
                  onClick={this.setPrepopulatedUserName}
                >
                  {cV}
                </button>
              </div>
            );
          }
        })}
        <div>
          <div className="QuickLogin__label">School Users</div>

          <button
            id="CLADMIN"
            className="QuickLogin__button pt-button"
            onClick={this.setPrepopulatedUserName}
          >
            CLADMIN - Multi-School Admin
          </button>
          <button
            id="schooladmincoastal"
            className="QuickLogin__button pt-button"
            onClick={this.setPrepopulatedUserName}
          >
            SCHADMIN - Coastal Martial Arts
          </button>
          <button
            id="schoolinstructcoastal"
            className="QuickLogin__button pt-button"
            onClick={this.setPrepopulatedUserName}
          >
            INSTRUCT - Coastal Martial Arts
          </button>
          <button
            id="U74504"
            className="QuickLogin__button pt-button"
            onClick={this.setPrepopulatedUserName}
          >
            STUDENT - Coastal Martial Arts
          </button>
        </div>
      </div>
    );
  }
  renderResetPassword() {
    if (this.props.token.status === POST_START) {
      return null;
    } else {
      return (
        <div className="Login__block ResetPassword">
          <Link className="pt-button" to={MODAL_PATH}>
            <span className="pt-icon pt-icon-lock" />
            Reset Password
          </Link>
        </div>
      );
    }
  }
  renderKioskLogin() {
    if (this.props.token.status === POST_START) {
      return null;
    } else {
      return (
        <div className="Login__block KioskLogin">
          <Link className="pt-button" to={KIOSK_LOGIN}>
            Kiosk Login
            <span className="pt-icon pt-icon-chevron-right" />
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <Module className="LoginModule">
        <Page className="LoginPage" title="Login">
          <Route
            path={MODAL_PATH}
            render={() => (
              <Modal title="Trouble Logging In?" closeUrl={CLOSE_URL}>
                <div className="RequestPasswordReset__description">
                  Enter your username and we will send you instructions to reset
                  your password.
                </div>
                <RequestPasswordFormContainer redirectOnSuccess={`/login`}>
                  <RequestPasswordForm />
                </RequestPasswordFormContainer>
              </Modal>
            )}
          />
          {this.state && !this.state.hideQuickLogin
            ? this.renderPrepopulatedUserNames()
            : null}
          <LoginFormContainer
            successRedirectUrl="/app"
            firstLoginRedirectUrl="/app/user/profile/edit"
          >
            <LoginForm />
          </LoginFormContainer>
          <div className="LoginPage__footer">
            {this.renderResetPassword()}
            {this.renderKioskLogin()}
          </div>
        </Page>
      </Module>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTokenPost: data => {
      dispatch(tokenPost(data));
    },
  };
};

export default connect(
  Login,
  mapStateToProps,
  mapDispatchToProps
);
