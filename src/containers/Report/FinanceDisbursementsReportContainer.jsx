import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  FinanceDisbursementsFetch,
  financeDisbursementsResetState,
} from 'src/redux/actionCreators/report/financeDisbursements';

const alwaysFetch = true;
const payloadDisplayName = 'Finance Disbursement';

class FinanceDisbursementsReportContainer extends React.Component {
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
    data: state.report.financeDisbursements,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(FinanceDisbursementsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(financeDisbursementsResetState());
    },
  };
};

export default connect(
  FinanceDisbursementsReportContainer,
  mapStateToProps,
  mapDispatchToProps
);
