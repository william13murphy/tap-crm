import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentProgressionDelete,
  studentProgressionDeleteFormReset,
} from 'src/redux/actionCreators/student/progressionDelete';

import { studentProgressionsFetch } from 'src/redux/actionCreators/student/progressions';

import { studentProgressionsByStyleFetch } from 'src/redux/actionCreators/student/progressionsByStyle';

const formPostAction = studentProgressionDelete;
const formResetAction = studentProgressionDeleteFormReset;

const payloadDisplayName = 'Student Progression';

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

class StudentProgressionDeleteContainer extends React.Component {
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
    formState: state.student.progressionDelete,
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
  StudentProgressionDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
