import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentDetailFetch,
  studentDetailResetState,
} from 'src/redux/actionCreators/student/detail';

const payloadDisplayName = 'Student Detail';

class StudentDetailContainer extends React.Component {
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
    data: state.student.detail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentDetailResetState());
    },
  };
};

export default connect(
  StudentDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
