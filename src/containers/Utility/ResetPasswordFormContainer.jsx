import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  resetPassword,
  resetPasswordFormReset,
} from 'src/redux/actionCreators/utility/resetPassword';

const payloadDisplayName = 'Password';

type ResetPasswordFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class ResetPasswordFormContainer extends React.Component {
  props: ResetPasswordFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.utility.resetPassword,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(resetPassword(data));
    },
    dispatchFormReset: () => {
      dispatch(resetPasswordFormReset());
    },
  };
};

export default connect(
  ResetPasswordFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
