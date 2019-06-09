import React from 'react';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';
import connect from 'src/redux/connect';

import {
  studentPlanPaymentSettlePost,
  studentPlanPaymentSettlePostFormReset,
} from 'src/redux/actionCreators/student/planPaymentSettlePost';

import { updateStudentPlanPaymentSettle } from 'api';

import { studentPlanPaymentsFetch } from 'src/redux/actionCreators/student/planPayments';

const payloadDisplayName = 'Payment Suspension';
const formPostEndpoint = updateStudentPlanPaymentSettle;

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class StudentPlanPaymentSettleFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    formState: state.student.planPaymentSettlePost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanPaymentSettlePost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanPaymentSettlePostFormReset());
    },
    dispatchActionOnSuccess: id => {
      dispatch(studentPlanPaymentsFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentSettleFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
