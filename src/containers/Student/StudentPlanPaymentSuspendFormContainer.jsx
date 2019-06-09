import React from 'react';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';
import connect from 'src/redux/connect';

import {
  studentPlanPaymentSuspendPost,
  studentPlanPaymentSuspendPostFormReset,
} from 'src/redux/actionCreators/student/planPaymentSuspendPost';

import { updateStudentPlanPaymentSuspend } from 'api';

import { studentPlanPaymentsFetch } from 'src/redux/actionCreators/student/planPayments';

const payloadDisplayName = 'Payment Suspension';
const formPostEndpoint = updateStudentPlanPaymentSuspend;

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class StudentPlanPaymentSuspendFormContainer extends React.Component {
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
    formState: state.student.planPaymentSuspendPost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanPaymentSuspendPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanPaymentSuspendPostFormReset());
    },
    dispatchActionOnSuccess: id => {
      dispatch(studentPlanPaymentsFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentSuspendFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
