import React from 'react';
import GenericFormContainer from 'containers/GenericFormContainer';
import connect from 'src/redux/connect';

import {
  planPaymentAccountPost,
  planPaymentAccountPostFormReset,
} from 'src/redux/actionCreators/student/planPaymentAccountPost';

const formPostAction = planPaymentAccountPost;
const formResetAction = planPaymentAccountPostFormReset;

import { planPaymentAccountsFetch } from 'src/redux/actionCreators/student/planPaymentAccounts';

const payloadDisplayName = 'Payment Account';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class StudentPlanPaymentAccountFormContainer extends React.Component {
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

// Have to Change this
function mapStateToProps(state) {
  return {
    formState: state.student.planPaymentAccountPost,
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
    dispatchActionOnClose: id => {
      dispatch(planPaymentAccountsFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentAccountFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
