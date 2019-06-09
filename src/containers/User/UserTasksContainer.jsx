import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  myTasksFetch,
  myTasksResetState,
} from 'src/redux/actionCreators/user/myTasks';

const payloadDisplayName = 'Tasks';

class UserTasksContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    token: {
      payload: {
        UserId: string,
      },
    },
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
    data: state.user.myTasks,
    dispatchFetchParams: state.token.payload.UserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(myTasksFetch(id));
    },
    dispatchResetState: () => {
      dispatch(myTasksResetState());
    },
  };
};

export default connect(
  UserTasksContainer,
  mapStateToProps,
  mapDispatchToProps
);
