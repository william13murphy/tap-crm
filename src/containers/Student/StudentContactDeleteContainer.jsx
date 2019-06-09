import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentContactDelete,
  studentContactDeleteFormReset,
} from 'src/redux/actionCreators/student/contactDelete';

import { studentContactsFetch } from 'src/redux/actionCreators/student/contacts';

const formPostAction = studentContactDelete;
const formResetAction = studentContactDeleteFormReset;

const payloadDisplayName = 'Student Contact Delete';

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

class StudentContactDeleteContainer extends React.Component {
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
    formState: state.student.contactDelete,
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
      dispatch(studentContactsFetch(id));
    },
  };
};

export default connect(
  StudentContactDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
