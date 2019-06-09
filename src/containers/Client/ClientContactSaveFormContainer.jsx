import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  clientContactPost,
  clientContactFormReset,
} from 'src/redux/actionCreators/client/contactPost';

const formPostAction = clientContactPost;
const formResetAction = clientContactFormReset;
const payloadDisplayName = 'Client Contact';

type FormContainerProps = {
  formState: {},
  children: React.DOMElement<any>,
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class ClientContactSaveFormContainer extends React.Component {
  props: FormContainerProps;
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
    formState: state.client.contactPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
  };
};

export default connect(
  ClientContactSaveFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
