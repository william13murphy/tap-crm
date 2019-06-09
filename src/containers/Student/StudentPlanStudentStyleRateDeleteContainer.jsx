import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanStudentStyleRateDelete,
  studentPlanStudentStyleRateDeleteFormReset,
} from 'src/redux/actionCreators/student/planStudentStyleRateDelete';

import { studentPlanStudentStyleRatesManyFetch } from 'src/redux/actionCreators/student/planStudentStyleRatesMany';

const payloadDisplayName = 'Student Program and Rate';

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

class StudentPlanStudentStyleRateDeleteContainer extends React.Component {
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
    formState: state.student.planStudentStyleRateDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: id => {
      dispatch(studentPlanStudentStyleRateDelete(id));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanStudentStyleRateDeleteFormReset());
    },
    dispatchActionOnClose: planStudentId => {
      dispatch(studentPlanStudentStyleRatesManyFetch(planStudentId));
    },
  };
};

export default connect(
  StudentPlanStudentStyleRateDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
