import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';
import { saveStudentEmailPlanSummary } from 'api';

import { studentClassesManyFetch } from 'src/redux/actionCreators/student/classesMany';

const formPostEndpoint = saveStudentEmailPlanSummary;

const payloadDisplayName = 'Email Plan Summary';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentEmailPlanSummaryStatefulFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      >
        {this.props.children}
      </GenericStatefulFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.emailPlanSummaryPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: id => {
      dispatch(studentClassesManyFetch(id));
    },
  };
};

export default connect(
  StudentEmailPlanSummaryStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
