import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import {
  studentRankRequirementPost,
  studentRankRequirementFormReset,
} from 'src/redux/actionCreators/student/rankRequirementPost';
import { saveStudentRankRequirement } from 'api/student';

import { studentRankRequirementsByStyleFetch } from 'src/redux/actionCreators/student/rankRequirementsByStyle';
import { studentprogressionSummaryFetch } from 'src/redux/actionCreators/student/progressionSummary';

const payloadDisplayName = 'Student Rank Requirements';
const formPostEndpoint = saveStudentRankRequirement;

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  initialValues?: any,
  update?: boolean,
};

class StudentRankRequirementTableFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        formPostEndpoint={formPostEndpoint}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.rankRequirementPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentRankRequirementPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentRankRequirementFormReset());
    },
    dispatchActionOnSuccess: data => {
      dispatch(studentRankRequirementsByStyleFetch(data));
      dispatch(studentprogressionSummaryFetch(data.StudentId));
    },
  };
};

export default connect(
  StudentRankRequirementTableFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
