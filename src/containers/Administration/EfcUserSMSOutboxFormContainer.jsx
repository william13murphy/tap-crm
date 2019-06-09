import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserSMSOutboxPost,
  efcUserSMSOutboxPostReset,
} from 'src/redux/actionCreators/administration/efcUserSMSOutboxPost';

import { efcUserOutboxGroupFetch } from 'src/redux/actionCreators/administration/efcUserOutboxGroup';

const payloadDisplayName = 'EFC User SMS Outbox Post';

type EfcUserSMSOutboxFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserSMSOutboxFormContainer extends React.Component {
  props: EfcUserSMSOutboxFormContainerProps;
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
    formState: state.administration.efcUserSMSOutboxPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserSMSOutboxPost(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserSMSOutboxPostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserOutboxGroupFetch(id));
    },
  };
};

export default connect(
  EfcUserSMSOutboxFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
