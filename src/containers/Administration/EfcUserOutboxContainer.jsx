import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserOutboxFetch,
  efcUserOutboxResetState,
} from 'src/redux/actionCreators/administration/efcUserOutbox';

const payloadDisplayName = 'EFC User Outbox';

class EfcUserOutboxContainer extends React.Component {
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
    data: state.administration.efcUserOutbox,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserOutboxFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserOutboxResetState());
    },
  };
};

export default connect(
  EfcUserOutboxContainer,
  mapStateToProps,
  mapDispatchToProps
);
