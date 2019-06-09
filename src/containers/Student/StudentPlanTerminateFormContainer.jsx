import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanTerminatePost,
  studentPlanTerminatePostFormReset,
} from 'src/redux/actionCreators/student/planTerminatePost';

// Fetch plan detail:
import { studentPlanDetailFetch } from 'src/redux/actionCreators/student/planDetail';

const payloadDisplayName = 'Cancel Plan';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class StudentPlanTerminateFormContainer extends React.Component {
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
    formState: state.student.planTerminatePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: planId => {
      dispatch(studentPlanTerminatePost(planId));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanTerminatePostFormReset());
    },
    dispatchActionOnClose: planId => {
      dispatch(studentPlanDetailFetch(planId));
    },
  };
};

export default connect(
  StudentPlanTerminateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
