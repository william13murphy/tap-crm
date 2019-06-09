import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanStudentDelete,
  studentPlanStudentDeleteFormReset,
} from 'src/redux/actionCreators/student/planStudentDelete';

import { studentPlanStudentsFetch } from 'src/redux/actionCreators/student/planStudents';

const payloadDisplayName = 'Remove Student from Plan';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
  studentId: string,
};

class StudentPlanStudentDeleteContainer extends React.Component {
  props: FormContainerProps;
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
    formState: state.student.planStudentDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: id => {
      dispatch(studentPlanStudentDelete(id));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanStudentDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(studentPlanStudentsFetch(id));
    },
  };
};

export default connect(
  StudentPlanStudentDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
