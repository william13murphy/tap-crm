import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  clientNotePost,
  clientNoteFormReset,
} from 'src/redux/actionCreators/client/notePost';

import { clientDetailFetch } from 'src/redux/actionCreators/client/detail';

const payloadDisplayName = 'Client Note';

type ClientNoteFormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class ClientNoteFormContainer extends React.Component {
  props: ClientNoteFormContainerProps;
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
    formState: state.client.notePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(clientNotePost(data));
    },
    dispatchFormReset: () => {
      dispatch(clientNoteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(clientDetailFetch(id));
    },
  };
};

export default connect(
  ClientNoteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
