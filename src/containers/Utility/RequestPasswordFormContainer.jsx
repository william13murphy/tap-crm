import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  requestPassword,
  requestPasswordFormReset,
} from 'src/redux/actionCreators/utility/requestPassword';

const payloadDisplayName = 'Password Request';

type RequestPasswordFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormCreateAction: any,
  dispatchFormUpdateAction: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class RequestPasswordFormContainer extends React.Component {
  props: RequestPasswordFormContainerProps;
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
    formState: state.utility.requestPassword,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(requestPassword(data));
    },
    dispatchFormReset: () => {
      dispatch(requestPasswordFormReset());
    },
  };
};

export default connect(
  RequestPasswordFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
