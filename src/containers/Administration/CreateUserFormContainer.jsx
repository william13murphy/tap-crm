import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  userCreate,
  userFormReset,
} from 'src/redux/actionCreators/administration/userPost';

import { efcUsersFetch } from 'src/redux/actionCreators/administration/efcUsers';

const payloadDisplayName = 'User';

type CreateUserFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class CreateUserFormContainer extends React.Component {
  props: CreateUserFormContainerProps;
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
      dispatch(userCreate(data));
    },
    dispatchFormReset: () => {
      dispatch(userFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUsersFetch(id));
    },
  };
};

export default connect(
  CreateUserFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
