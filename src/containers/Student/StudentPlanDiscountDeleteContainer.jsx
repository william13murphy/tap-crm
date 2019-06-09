import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanDiscountDelete,
  studentPlanDiscountDeleteFormReset,
} from 'src/redux/actionCreators/student/planDiscountDelete';

import { studentPlanDiscountsFetch } from 'src/redux/actionCreators/student/planDiscounts';

// Fetch plan detail:
import { studentPlanDetailFetch } from 'src/redux/actionCreators/student/planDetail';

const formPostAction = studentPlanDiscountDelete;
const formResetAction = studentPlanDiscountDeleteFormReset;

const payloadDisplayName = 'plan Discount Delete';

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

class StudentPlanDiscountDeleteContainer extends React.Component {
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
    formState: state.student.planDiscountDelete,
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
    dispatchActionOnClose: planId => {
      dispatch(studentPlanDiscountsFetch(planId));
      dispatch(studentPlanDetailFetch(planId));
    },
  };
};

export default connect(
  StudentPlanDiscountDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
