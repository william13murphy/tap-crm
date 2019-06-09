import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentMessagesFetch,
  studentMessagesResetState,
} from 'src/redux/actionCreators/student/messages';

const payloadDisplayName = 'Student Messages';

class StudentMessagesContainer extends React.Component {
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
    data: state.student.messages,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentMessagesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentMessagesResetState());
    },
  };
};

export default connect(
  StudentMessagesContainer,
  mapStateToProps,
  mapDispatchToProps
);
