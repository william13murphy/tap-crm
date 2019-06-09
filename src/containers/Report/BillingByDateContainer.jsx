import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  billingByDateFetch,
  billingByDateResetState,
} from 'src/redux/actionCreators/report/billingByDate';

const payloadDisplayName = 'Report';

class BillingByDateContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: any,
    dispatchActionOnClose: any,
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
    data: state.report.billingByDate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(billingByDateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(billingByDateResetState());
    },
  };
};

export default connect(
  BillingByDateContainer,
  mapStateToProps,
  mapDispatchToProps
);
