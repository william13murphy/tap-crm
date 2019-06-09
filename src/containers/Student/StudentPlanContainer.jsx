import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanFetch,
  studentPlanResetState,
} from 'src/redux/actionCreators/student/plan';

const payloadDisplayName = 'Student Plan';

class StudentPlanContainer extends React.Component {
  props: {
    id: string,
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
    data: state.student.plan,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentPlanFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanResetState());
    },
  };
};

export default connect(
  StudentPlanContainer,
  mapStateToProps,
  mapDispatchToProps
);
