import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentContactCreate,
  studentContactUpdate,
  studentContactPostFormReset,
} from 'src/redux/actionCreators/student/contactPost';

import { studentContactsFetch } from 'src/redux/actionCreators/student/contacts';

const payloadDisplayName = 'Contact';

type StudentContactFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchStudentContactCreate: any,
  dispatchStudentContactUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  update: boolean,
  initialValues: Object,
};

class StudentContactFormContainer extends React.Component {
  props: StudentContactFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchStudentContactUpdate
            : this.props.dispatchStudentContactCreate
        }
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.contactPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchStudentContactCreate: data => {
      dispatch(studentContactCreate(data));
    },
    dispatchStudentContactUpdate: data => {
      dispatch(studentContactUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(studentContactPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(studentContactsFetch(id));
    },
  };
};

export default connect(
  StudentContactFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
