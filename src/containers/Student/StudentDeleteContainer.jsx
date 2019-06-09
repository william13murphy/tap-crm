import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { anemicStudentsFetch } from 'src/redux/actionCreators/school/anemicStudents';
import {
  studentDelete,
  studentDeleteFormReset,
} from 'src/redux/actionCreators/student/studentDelete';

const payloadDisplayName = 'Student Delete';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentDeleteContainer extends React.Component {
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
  return { formState: state.student.studentDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(studentDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(anemicStudentsFetch(id));
    },
  };
};

export default connect(
  StudentDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
