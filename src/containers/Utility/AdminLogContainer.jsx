import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  adminLogFetch,
  adminLogResetState,
} from 'src/redux/actionCreators/utility/adminLog';

const payloadDisplayName = 'Log';

class AdminLogContainer extends React.Component {
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
    data: state.utility.adminLog,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(adminLogFetch());
    },
    dispatchResetState: () => {
      dispatch(adminLogResetState());
    },
  };
};

export default connect(
  AdminLogContainer,
  mapStateToProps,
  mapDispatchToProps
);
