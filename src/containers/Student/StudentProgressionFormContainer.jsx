import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentProgressionPost,
  studentProgressionPostFormReset,
} from 'src/redux/actionCreators/student/progressionPost';

import { studentProgressionsFetch } from 'src/redux/actionCreators/student/progressions';

import { studentProgressionsByStyleFetch } from 'src/redux/actionCreators/student/progressionsByStyle';

const formPostAction = studentProgressionPost;
const formResetAction = studentProgressionPostFormReset;

const payloadDisplayName = 'Student Program Rank Progression';

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

class StudentProgressionFormContainer extends React.Component {
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
    formState: state.student.progressionPost,
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
    dispatchActionOnClose: closeParams => {
      dispatch(studentProgressionsFetch(closeParams.studentId));
      dispatch(studentProgressionsByStyleFetch(closeParams));
    },
  };
};

export default connect(
  StudentProgressionFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
