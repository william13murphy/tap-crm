import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  stateProvinceMasterFetch,
  stateProvinceMasterResetState,
} from 'src/redux/actionCreators/utility/stateProvinceMaster';

const alwaysFetch = true;
const payloadDisplayName = 'States';

class StateProvinceMasterContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        data={this.props.data}
        dispatchFetch={this.props.dispatchFetch}
        options={this.props.options || {}}
      >
        {this.props.children}
      </GenericFetchContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.utility.stateProvinceMaster,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(stateProvinceMasterFetch());
    },
    dispatchResetState: () => {
      dispatch(stateProvinceMasterResetState());
    },
  };
};

export default connect(
  StateProvinceMasterContainer,
  mapStateToProps,
  mapDispatchToProps
);
