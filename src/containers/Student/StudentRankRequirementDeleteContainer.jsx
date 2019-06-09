import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentRankRequirementDelete,
  studentRankRequirementDeleteFormReset,
} from 'src/redux/actionCreators/student/rankRequirementDelete';

import { studentRankRequirementsByStyleFetch } from 'src/redux/actionCreators/student/rankRequirementsByStyle';

const formPostAction = studentRankRequirementDelete;
const formResetAction = studentRankRequirementDeleteFormReset;

const payloadDisplayName = 'Student Rank Requirement';

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
};

class StudentRankRequirementDeleteContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.rankRequirementDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: data => {
      dispatch(studentRankRequirementsByStyleFetch(data));
    },
  };
};

export default connect(
  StudentRankRequirementDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
