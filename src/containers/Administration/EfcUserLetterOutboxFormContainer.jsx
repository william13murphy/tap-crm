import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserLetterOutboxPost,
  efcUserLetterOutboxPostReset,
} from 'src/redux/actionCreators/administration/efcUserLetterOutboxPost';

import { efcUserOutboxGroupFetch } from 'src/redux/actionCreators/administration/efcUserOutboxGroup';

const payloadDisplayName = 'EFC User Letter Outbox Post';

type EfcUserLetterOutboxFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserLetterOutboxFormContainer extends React.Component {
  props: EfcUserLetterOutboxFormContainerProps;
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
    formState: state.administration.efcUserLetterOutboxPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserLetterOutboxPost(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserLetterOutboxPostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserOutboxGroupFetch(id));
    },
  };
};

export default connect(
  EfcUserLetterOutboxFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
