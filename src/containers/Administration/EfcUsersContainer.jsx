import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUsersFetch,
  efcUsersResetState,
} from 'src/redux/actionCreators/administration/efcUsers';

const payloadDisplayName = 'EFC Users';

class EfcUsersContainer extends React.Component {
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
    data: state.administration.efcUsers,
    dispatchFetchParams: state.token.payload.UserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUsersFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUsersResetState());
    },
  };
};

export default connect(
  EfcUsersContainer,
  mapStateToProps,
  mapDispatchToProps
);
