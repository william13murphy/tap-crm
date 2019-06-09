import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  revenueBySourceFetch,
  revenueBySourceResetState,
} from 'src/redux/actionCreators/report/revenueBySource';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class RevenueBySourceContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.revenueBySource,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(revenueBySourceFetch(id));
    },
    dispatchResetState: () => {
      dispatch(revenueBySourceResetState());
    },
  };
};

export default connect(
  RevenueBySourceContainer,
  mapStateToProps,
  mapDispatchToProps
);
