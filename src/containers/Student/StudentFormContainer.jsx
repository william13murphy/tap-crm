import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentCreate,
  studentUpdate,
  studentFormReset,
} from 'src/redux/actionCreators/student/studentPost';

import { studentDetailFetch } from 'src/redux/actionCreators/student/detail';

const payloadDisplayName = 'Student';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  update?: boolean,
  dispatchStudentCreate: Function,
  dispatchStudentUpdate: Function,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  redirectOnSuccessWithReturnedId: string,
};

class StudentFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchStudentUpdate
            : this.props.dispatchStudentCreate
        }
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.studentPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchStudentCreate: data => {
      dispatch(studentCreate(data));
    },
    dispatchStudentUpdate: data => {
      dispatch(studentUpdate(data));
    },
    dispatchActionOnClose: data => {
      dispatch(studentDetailFetch(data));
    },
    dispatchFormReset: () => {
      dispatch(studentFormReset());
    },
  };
};

export default connect(
  StudentFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
