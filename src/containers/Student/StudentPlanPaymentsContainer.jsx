import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanPaymentsFetch,
  studentPlanPaymentsResetState,
} from 'src/redux/actionCreators/student/planPayments';

const payloadDisplayName = 'Plan Payments';

class StudentPlanPaymentsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.planPayments,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (planId: string) => {
      dispatch(studentPlanPaymentsFetch(planId));
    },
    dispatchResetState: () => {
      dispatch(studentPlanPaymentsResetState());
    },
  };
};

export default connect(
  StudentPlanPaymentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
