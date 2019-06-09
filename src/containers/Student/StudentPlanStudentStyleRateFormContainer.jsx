import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanStudentStyleRatePost,
  studentPlanStudentStyleRatePostFormReset,
} from 'src/redux/actionCreators/student/planStudentStyleRatePost';

import { studentPlanStudentStyleRatesManyFetch } from 'src/redux/actionCreators/student/planStudentStyleRatesMany';

// Fetch plan detail:
import { studentPlanDetailFetch } from 'src/redux/actionCreators/student/planDetail';

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

class StudentPlanStudentStyleRateFormContainer extends React.Component {
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
    formState: state.student.planStudentStyleRatePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanStudentStyleRatePost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanStudentStyleRatePostFormReset());
    },
    dispatchActionOnClose: ({ planStudentId, planId }) => {
      dispatch(studentPlanStudentStyleRatesManyFetch(planStudentId));
      dispatch(studentPlanDetailFetch(planId));
    },
  };
};

export default connect(
  StudentPlanStudentStyleRateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
