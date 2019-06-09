import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  studentListSave,
  studentListFormReset,
} from 'src/redux/actionCreators/school/studentListPost';

import { allStudentListsFetch } from 'src/redux/actionCreators/school/allStudentLists';

const formPostAction = studentListSave;
const formResetAction = studentListFormReset;

const payloadDisplayName = 'Student List';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
};

class StudentListFormContainer extends React.Component {
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
    formState: state.school.studentListPost,
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
    dispatchActionOnClose: id => {
      dispatch(allStudentListsFetch(id));
    },
  };
};

export default connect(
  StudentListFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
