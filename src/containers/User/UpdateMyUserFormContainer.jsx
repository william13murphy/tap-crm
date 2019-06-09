import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  myUserUpdate,
  myUserFormReset,
} from 'src/redux/actionCreators/user/myUserPost';

import { userMeFetch } from 'src/redux/actionCreators/user/me';

const payloadDisplayName = 'User Profile';

type UpdateMyUserFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdateMyUserFormContainer extends React.Component {
  props: UpdateMyUserFormContainerProps;
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
    formState: state.user.myUserPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(myUserUpdate(data));
    },
    dispatchActionOnClose: id => {
      dispatch(userMeFetch(id));
    },
    dispatchFormReset: () => {
      dispatch(myUserFormReset());
    },
  };
};

export default connect(
  UpdateMyUserFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
