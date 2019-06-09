import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentMessageDelete,
  studentMessageDeleteFormReset,
} from 'src/redux/actionCreators/student/messageDelete';

import { studentMessagesFetch } from 'src/redux/actionCreators/student/messages';

const formPostAction = studentMessageDelete;
const formResetAction = studentMessageDeleteFormReset;

const payloadDisplayName = 'Student Message Delete';

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

class StudentMessageDeleteContainer extends React.Component {
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
    formState: state.student.messageDelete,
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
      dispatch(studentMessagesFetch(id));
    },
  };
};

export default connect(
  StudentMessageDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
