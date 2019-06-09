import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allBeltMasterFetch,
  allBeltMasterResetState,
} from 'src/redux/actionCreators/utility/allBeltMaster';

const payloadDisplayName = 'All Belt Masters';

class AllBeltMasterContainer extends React.Component {
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
    data: state.utility.allBeltMaster,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(allBeltMasterFetch());
    },
    dispatchResetState: () => {
      dispatch(allBeltMasterResetState());
    },
  };
};

export default connect(
  AllBeltMasterContainer,
  mapStateToProps,
  mapDispatchToProps
);
