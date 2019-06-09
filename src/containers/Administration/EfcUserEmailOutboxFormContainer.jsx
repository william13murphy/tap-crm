import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserEmailOutboxPost,
  efcUserEmailOutboxPostReset,
} from 'src/redux/actionCreators/administration/efcUserEmailOutboxPost';

import { efcUserOutboxGroupFetch } from 'src/redux/actionCreators/administration/efcUserOutboxGroup';

const payloadDisplayName = 'EFC User Email Outbox Post';

type EfcUserEmailOutboxFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserEmailOutboxFormContainer extends React.Component {
  props: EfcUserEmailOutboxFormContainerProps;
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
    formState: state.administration.efcUserEmailOutboxPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserEmailOutboxPost(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserEmailOutboxPostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserOutboxGroupFetch(id));
    },
  };
};

export default connect(
  EfcUserEmailOutboxFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
