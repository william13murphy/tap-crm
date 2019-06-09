import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanDiscountsFetch,
  studentPlanDiscountsResetState,
} from 'src/redux/actionCreators/student/planDiscounts';

const payloadDisplayName = 'Student Enrollment Discounts';

class StudentPlanDiscountsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
    data: state.student.planDiscounts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlanDiscountsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanDiscountsResetState());
    },
  };
};

export default connect(
  StudentPlanDiscountsContainer,
  mapStateToProps,
  mapDispatchToProps
);
