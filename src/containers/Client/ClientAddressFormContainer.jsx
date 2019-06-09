import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  clientAddressPost,
  clientAddressFormReset,
} from 'src/redux/actionCreators/client/addressPost';

import { clientDetailFetch } from 'src/redux/actionCreators/client/detail';

const payloadDisplayName = 'Client Address';

type ClientAddressFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class ClientAddressFormContainer extends React.Component {
  props: ClientAddressFormContainerProps;
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
    formState: state.client.addressPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(clientAddressPost(data));
    },
    dispatchFormReset: () => {
      dispatch(clientAddressFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(clientDetailFetch(id));
    },
  };
};

export default connect(
  ClientAddressFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
