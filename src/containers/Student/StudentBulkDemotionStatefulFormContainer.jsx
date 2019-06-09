import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import { schoolStyleStudentsProgressionFetch } from 'src/redux/actionCreators/school/styleStudentsProgression';
import { saveStudentBulkDemote } from 'api';

const formPostEndpoint = saveStudentBulkDemote;
const payloadDisplayName = 'Student Bulk Demotion';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
  studentId: string,
};

class StudentBulkDemotionStatefulFormContainer extends React.Component {
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
    formState: state.student.bulkDemotionPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: id => {
      dispatch(schoolStyleStudentsProgressionFetch(id));
    },
  };
};

export default connect(
  StudentBulkDemotionStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
