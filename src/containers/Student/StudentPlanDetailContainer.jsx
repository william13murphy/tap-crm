import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanDetailFetch,
  studentPlanDetailResetState,
} from 'src/redux/actionCreators/student/planDetail';

const payloadDisplayName = 'Student Plan';

class StudentPlanDetailContainer extends React.Component {
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
    data: state.student.planDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlanDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanDetailResetState());
    },
  };
};

export default connect(
  StudentPlanDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
