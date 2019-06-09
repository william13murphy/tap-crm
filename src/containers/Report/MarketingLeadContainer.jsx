import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  marketingLeadFetch,
  marketingLeadResetState,
} from 'src/redux/actionCreators/report/marketingLead';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class MarketingLeadContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    dispatchFetchParams: {
      schoolId: string,
    },
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
    data: state.report.marketingLead,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(marketingLeadFetch(id));
    },
    dispatchResetState: () => {
      dispatch(marketingLeadResetState());
    },
  };
};

export default connect(
  MarketingLeadContainer,
  mapStateToProps,
  mapDispatchToProps
);
