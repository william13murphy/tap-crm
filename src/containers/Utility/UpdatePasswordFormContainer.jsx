import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  changePassword,
  changePasswordFormReset,
} from 'src/redux/actionCreators/utility/changePassword';

import { userMeFetch } from 'src/redux/actionCreators/user/me';

const payloadDisplayName = 'Password';

type UpdatePasswordFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdatePasswordFormContainer extends React.Component {
  props: UpdatePasswordFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.utility.changePassword,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(changePassword(data));
    },
    dispatchFormReset: () => {
      dispatch(changePasswordFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(userMeFetch(id));
    },
  };
};

export default connect(
  UpdatePasswordFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
