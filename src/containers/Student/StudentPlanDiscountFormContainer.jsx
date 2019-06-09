import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanDiscountPost,
  studentPlanDiscountPostFormReset,
} from 'src/redux/actionCreators/student/planDiscountPost';

import { studentPlanDiscountsFetch } from 'src/redux/actionCreators/student/planDiscounts';

// Fetch plan detail:
import { studentPlanDetailFetch } from 'src/redux/actionCreators/student/planDetail';

const formPostAction = studentPlanDiscountPost;
const formResetAction = studentPlanDiscountPostFormReset;

const payloadDisplayName = 'School Discount';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class StudentPlanDiscountFormContainer extends React.Component {
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
    formState: state.student.planDiscountPost,
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
  StudentPlanDiscountFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
