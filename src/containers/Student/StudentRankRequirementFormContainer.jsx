import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentRankRequirementPost,
  studentRankRequirementFormReset,
} from 'src/redux/actionCreators/student/rankRequirementPost';

import { studentRankRequirementsByStyleFetch } from 'src/redux/actionCreators/student/rankRequirementsByStyle';

const payloadDisplayName = 'Student Rank Requirements';

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

class StudentRankRequirementFormContainer extends React.Component {
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
    dispatchActionOnClose: data => {
      dispatch(studentRankRequirementsByStyleFetch(data));
    },
  };
};

export default connect(
  StudentRankRequirementFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
