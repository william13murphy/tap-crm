import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import {
  studentWaiverGenerateManyFetch,
  studentWaiverGenerateManyResetState,
} from 'src/redux/actionCreators/student/waiverGenerateMany';

const payloadDisplayName = 'Student Waiver';

class StudentWaiverGenerateManyContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string, // studentId
    options?: {},
  };
  render() {
    return (
      <GenericManyFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.waiverGenerateMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (studentId: string) => {
      dispatch(studentWaiverGenerateManyFetch(studentId));
    },
    dispatchResetState: () => {
      dispatch(studentWaiverGenerateManyResetState());
    },
  };
};

export default connect(
  StudentWaiverGenerateManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
