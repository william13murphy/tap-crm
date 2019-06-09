import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  clientCreate,
  clientUpdate,
  clientFormReset,
} from 'src/redux/actionCreators/client/clientPost';

const payloadDisplayName = 'Client';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchClientCreate: any,
  dispatchClientUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  update?: boolean,
};

class ClientFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchClientUpdate
            : this.props.dispatchClientCreate
        }
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.client.clientPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchClientCreate: data => {
      dispatch(clientCreate(data));
    },
    dispatchClientUpdate: data => {
      dispatch(clientUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(clientFormReset());
    },
  };
};

export default connect(
  ClientFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
