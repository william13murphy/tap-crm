import React from 'react';
import GenericFormContainer from 'containers/GenericFormContainer';
import connect from 'src/redux/connect';
import {
  studentplanUpdate,
  studentplanUpdateFormReset,
} from 'src/redux/actionCreators/student/planUpdate';
import { studentPlanFetch } from 'src/redux/actionCreators/student/plan';

const payloadDisplayName = 'Plan Payment Term';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  intialValues?: any,
};

class StudentPlanPaymentTermFormContainer extends React.Component {
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
  return {
    formState: state.student.planUpdate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentplanUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(studentplanUpdateFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(studentPlanFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentTermFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
