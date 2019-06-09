import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentMessagePost,
  studentMessageFormReset,
} from 'src/redux/actionCreators/student/messagePost';

import { studentMessagesFetch } from 'src/redux/actionCreators/student/messages';

const formPostAction = studentMessagePost;
const formResetAction = studentMessageFormReset;

const payloadDisplayName = 'Student Message';

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

class StudentMessageFormContainer extends React.Component {
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
    formState: state.student.messagePost,
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
  StudentMessageFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
