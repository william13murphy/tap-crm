import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  changeEmail,
  changeEmailFormReset,
} from 'src/redux/actionCreators/utility/changeEmail';

import { userMeFetch } from 'src/redux/actionCreators/user/me';

const payloadDisplayName = 'Email Address';

type UpdateEmailFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdateEmailFormContainer extends React.Component {
  props: UpdateEmailFormContainerProps;
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
    formState: state.utility.changeEmail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(changeEmail(data));
    },
    dispatchFormReset: () => {
      dispatch(changeEmailFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(userMeFetch(id));
    },
  };
};

export default connect(
  UpdateEmailFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
