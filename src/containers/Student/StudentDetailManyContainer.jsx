import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import {
  studentDetailManyFetch,
  studentDetailManyResetState,
} from 'src/redux/actionCreators/student/detailMany';

const payloadDisplayName = 'Student Detail';

class StudentDetailManyContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.student.detailMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (studentId: string) => {
      dispatch(studentDetailManyFetch(studentId));
    },
    dispatchResetState: () => {
      dispatch(studentDetailManyResetState());
    },
  };
};

export default connect(
  StudentDetailManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
