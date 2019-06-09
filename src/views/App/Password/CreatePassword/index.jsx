import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageTitle from 'components/Layout/PageTitle';
import ValidatePasswordRequestContainer from 'containers/Utility/ValidatePasswordRequestContainer';
import ResetPasswordFormContainer from 'containers/Utility/ResetPasswordFormContainer';
import ResetPasswordForm from './ResetPasswordForm';
import TAPColor from 'assets/images/TAP_Color.svg';
import PasswordRequirementsCallout from 'components/PasswordRequirementsCallout';

import './styles.less';

type CreatePasswordProps = {
  match: {
    params: {
      id: string,
    },
  },
  validatePasswordRequest: {
    payload: string,
  },
};

class CreatePassword extends React.Component {
  props: CreatePasswordProps;
  render() {
    return (
      <Page
        className="CreatePasswordPage ResetPasswordPage"
        title="Create Password"
      >
        <img className="TapLogo__small" src={TAPColor} />
        <PageTitle>Set Your Password</PageTitle>

        <ValidatePasswordRequestContainer id={this.props.match.params.id}>
          <ResetPasswordFormContainer redirectOnSuccess={`/login`}>
            <ResetPasswordForm
              id={this.props.validatePasswordRequest.payload}
            />
          </ResetPasswordFormContainer>
        </ValidatePasswordRequestContainer>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    validatePasswordRequest: state.utility.validatePasswordRequest,
  };
};

export default connect(
  CreatePassword,
  mapStateToProps
);
