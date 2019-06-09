import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from '../GenericFormContainer';

import {
  authenticatePost,
  authenticateReset,
} from 'src/redux/actionCreators/kiosk/authenticate';

const formPostAction = authenticatePost;
const formResetAction = authenticateReset;

const payloadDisplayName = 'Authentication';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  redirectOnSuccess: string,
};

class AuthenticateFormContainer extends React.Component {
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
    formState: state.kiosk.authenticate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    /** Not Reseting Form to maintain class state in redux */
    // dispatchFormReset: () => {
    //   dispatch(formResetAction());
    // },
  };
};

export default connect(
  AuthenticateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
