import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  userFetch,
  userResetState,
} from 'src/redux/actionCreators/administration/user';

const payloadDisplayName = 'User';

class UserContainer extends React.Component {
  props: {
    id: string,
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
    data: state.administration.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(userFetch(id));
    },
    dispatchResetState: () => {
      dispatch(userResetState());
    },
  };
};

export default connect(
  UserContainer,
  mapStateToProps,
  mapDispatchToProps
);
