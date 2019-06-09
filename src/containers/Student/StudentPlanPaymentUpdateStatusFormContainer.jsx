import React from 'react';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';
import connect from 'src/redux/connect';

import {
  studentPlanPaymentUpdateStatusPost,
  studentPlanPaymentUpdateStatusPostFormReset,
} from 'src/redux/actionCreators/student/planPaymentUpdateStatusPost';

import { updateStudentPlanPaymentUpdateStatus } from 'api';

import { studentPlanPaymentsFetch } from 'src/redux/actionCreators/student/planPayments';

const payloadDisplayName = 'Payment Status';
const formPostEndpoint = updateStudentPlanPaymentUpdateStatus;

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class StudentPlanPaymentUpdateStatusFormContainer extends React.Component {
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
    formState: state.student.planPaymentUpdateStatusPost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanPaymentUpdateStatusPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanPaymentUpdateStatusPostFormReset());
    },
    dispatchActionOnSuccess: id => {
      dispatch(studentPlanPaymentsFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentUpdateStatusFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
