import React from 'react';
import connect from 'src/redux/connect';
import { tokenPost } from 'src/redux/actionCreators/kiosk/token';

import {
  getEnvironmentName,
  ENV_SANDBOX,
  ENV_PRODUCTION,
} from 'util/environment/name';

import Page from 'components/Layout/Page';

import LoginFormContainer from 'containers/Kiosk/LoginFormContainer';
import LoginForm from './LoginForm';

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
        <div>
          <div className="QuickLogin__label">Quick Login</div>
          <button
            id="schooladmincoastal"
            className="pt-button"
            onClick={this.setPrepopulatedUserName}
          >
            SCHADMIN - Coastal Martial Arts
          </button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Page className="LoginPage" title="Login">
        {this.state && !this.state.hideQuickLogin
          ? this.renderPrepopulatedUserNames()
          : null}
        <LoginFormContainer successRedirectUrl="/kiosk/authenticate">
          <LoginForm />
        </LoginFormContainer>
      </Page>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.kiosk.token,
    Logo: state.school.anemicDetail.payload,
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
