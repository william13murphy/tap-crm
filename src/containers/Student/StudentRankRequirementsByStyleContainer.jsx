import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentRankRequirementsByStyleFetch,
  studentRankRequirementsByStyleResetState,
} from 'src/redux/actionCreators/student/rankRequirementsByStyle';

const payloadDisplayName = 'Student Rank Requirements';

class StudentRankRequirementsByStyleContainer extends React.Component {
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
    data: state.student.rankRequirementsByStyle,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentRankRequirementsByStyleFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentRankRequirementsByStyleResetState());
    },
  };
};

export default connect(
  StudentRankRequirementsByStyleContainer,
  mapStateToProps,
  mapDispatchToProps
);
