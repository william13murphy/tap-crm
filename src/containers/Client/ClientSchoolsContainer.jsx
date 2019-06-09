import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  clientSchoolsFetch,
  clientSchoolsResetState,
} from 'src/redux/actionCreators/client/schools';

const payloadDisplayName = 'Client Schools';

class ClientSchoolsContainer extends React.Component {
  props: {
    id: string,
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
    data: state.client.schools,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(clientSchoolsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(clientSchoolsResetState());
    },
  };
};

export default connect(
  ClientSchoolsContainer,
  mapStateToProps,
  mapDispatchToProps
);
