import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentWaiverPost,
  studentWaiverPostFormReset,
} from 'src/redux/actionCreators/student/waiverPost';

import { studentDetailManyFetch } from 'src/redux/actionCreators/student/detailMany';
import { studentDetailFetch } from 'src/redux/actionCreators/student/detail';

const payloadDisplayName = 'Student Waiver';

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

class StudentWaiverFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchActionOnClose={
          this.props.many
            ? this.props.dispatchStudentDetailManyFetch
            : this.props.dispatchStudentDetailFetch
        }
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.waiverPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentWaiverPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentWaiverPostFormReset());
    },
    dispatchStudentDetailManyFetch: studentId => {
      dispatch(studentDetailManyFetch(studentId));
    },
    dispatchStudentDetailFetch: studentId => {
      dispatch(studentDetailFetch(studentId));
    },
  };
};

export default connect(
  StudentWaiverFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
