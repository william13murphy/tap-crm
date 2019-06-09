import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allClientsFetch,
  allClientsResetState,
} from 'src/redux/actionCreators/client/allClients';

const payloadDisplayName = 'Clients';

class AllClientsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
    data: state.client.allClients,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(allClientsFetch());
    },
    dispatchResetState: () => {
      dispatch(allClientsResetState());
    },
  };
};

export default connect(
  AllClientsContainer,
  mapStateToProps,
  mapDispatchToProps
);
