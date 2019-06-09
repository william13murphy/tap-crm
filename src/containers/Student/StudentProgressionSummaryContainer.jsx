import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentprogressionSummaryFetch,
  studentprogressionSummaryResetState,
} from 'src/redux/actionCreators/student/progressionSummary';

const payloadDisplayName = 'Student Grading Summary';

class StudentProgressionSummaryContainer extends React.Component {
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
    data: state.student.progressionSummary,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentprogressionSummaryFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentprogressionSummaryResetState());
    },
  };
};

export default connect(
  StudentProgressionSummaryContainer,
  mapStateToProps,
  mapDispatchToProps
);
