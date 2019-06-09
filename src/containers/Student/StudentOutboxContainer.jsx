import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentOutboxFetch,
  studentOutboxResetState,
} from 'src/redux/actionCreators/student/outbox';

const payloadDisplayName = 'Student Outbox';

class StudentOutboxContainer extends React.Component {
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
    data: state.student.outbox,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentOutboxFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentOutboxResetState());
    },
  };
};

export default connect(
  StudentOutboxContainer,
  mapStateToProps,
  mapDispatchToProps
);
