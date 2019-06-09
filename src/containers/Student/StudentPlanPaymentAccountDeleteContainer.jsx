import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanPaymentAccountDelete,
  studentPlanPaymentAccountDeleteFormReset,
} from 'src/redux/actionCreators/student/planPaymentAccountDelete';

// import { studentPackageDetailFetch } from 'src/redux/actionCreators/student/packageDetail';
import { planPaymentAccountsFetch } from 'src/redux/actionCreators/student/planPaymentAccounts';

const payloadDisplayName = 'Plan Paymnet Account Delete';

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

class StudentPlanPaymentAccountDeleteContainer extends React.Component {
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
    formState: state.student.planPaymentAccountDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanPaymentAccountDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanPaymentAccountDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(planPaymentAccountsFetch(id));
    },
  };
};

export default connect(
  StudentPlanPaymentAccountDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
