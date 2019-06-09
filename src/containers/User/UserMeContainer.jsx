import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  userMeFetch,
  userMeResetState,
} from 'src/redux/actionCreators/user/me';

const payloadDisplayName = 'User';

class UserMeContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
    data: state.user.me,
    dispatchFetchParams: state.token.payload.UserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(userMeFetch(id));
    },
    dispatchResetState: () => {
      dispatch(userMeResetState());
    },
  };
};

export default connect(
  UserMeContainer,
  mapStateToProps,
  mapDispatchToProps
);
