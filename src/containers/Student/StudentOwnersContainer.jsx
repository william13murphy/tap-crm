import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentOwnersFetch,
  studentOwnersResetState,
} from 'src/redux/actionCreators/student/owners';

const payloadDisplayName = 'Student owners';

class StudentOwnersContainer extends React.Component {
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
    data: state.student.owners,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentOwnersFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentOwnersResetState());
    },
  };
};

export default connect(
  StudentOwnersContainer,
  mapStateToProps,
  mapDispatchToProps
);
