import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  userUpdate,
  userFormReset,
} from 'src/redux/actionCreators/administration/userPost';
import { userFetch } from 'src/redux/actionCreators/administration/user';

const payloadDisplayName = 'User Profile';

type UpdateUserProfileFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdateUserProfileFormContainer extends React.Component {
  props: UpdateUserProfileFormContainerProps;
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
    formState: state.administration.userPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(userUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(userFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(userFetch(id));
    },
  };
};

export default connect(
  UpdateUserProfileFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
