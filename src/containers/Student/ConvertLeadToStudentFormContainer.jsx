import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentCreate,
  studentFormReset,
} from 'src/redux/actionCreators/student/studentPost';
import {
  schoolLeadPost,
  schoolLeadPostFormReset,
} from 'src/redux/actionCreators/school/leadPost';

const payloadDisplayName = 'Student';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  update?: boolean,
  dispatchStudentCreate: Function,
  dispatchschoolLeadPost: Function,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  redirectOnSuccessWithReturnedId: string,
};

class ConvertLeadToStudentFormContainer extends React.Component {
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
    formState: state.student.studentPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: params => {
      dispatch(schoolLeadPost(params.leadData));
      dispatch(studentCreate(params.studentData));
    },
    dispatchFormReset: () => {
      dispatch(studentFormReset());
      dispatch(schoolLeadPostFormReset());
    },
  };
};

export default connect(
  ConvertLeadToStudentFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
