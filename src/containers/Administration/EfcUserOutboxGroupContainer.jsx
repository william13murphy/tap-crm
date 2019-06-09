import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserOutboxGroupFetch,
  efcUserOutboxGroupResetState,
} from 'src/redux/actionCreators/administration/efcUserOutboxGroup';

const payloadDisplayName = 'EFC User Outbox Group';

class EfcUserOutboxGroupContainer extends React.Component {
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
    data: state.administration.efcUserOutboxGroup,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserOutboxGroupFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserOutboxGroupResetState());
    },
  };
};

export default connect(
  EfcUserOutboxGroupContainer,
  mapStateToProps,
  mapDispatchToProps
);
