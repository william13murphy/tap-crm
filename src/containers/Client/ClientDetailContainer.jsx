import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  clientDetailFetch,
  clientDetailResetState,
} from 'src/redux/actionCreators/client/detail';

const payloadDisplayName = 'Client Detail';

class ClientDetailContainer extends React.Component {
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
    data: state.client.detail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(clientDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(clientDetailResetState());
    },
  };
};

export default connect(
  ClientDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
