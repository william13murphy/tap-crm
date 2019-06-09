import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allUsersFetch,
  allUsersResetState,
} from 'src/redux/actionCreators/administration/allUsers';

const payloadDisplayName = 'Users';

class AllUsersContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.administration.allUsers,
    dispatchFetchParams: state.token.payload.UserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(allUsersFetch());
    },
    dispatchResetState: () => {
      dispatch(allUsersResetState());
    },
  };
};

export default connect(
  AllUsersContainer,
  mapStateToProps,
  mapDispatchToProps
);
