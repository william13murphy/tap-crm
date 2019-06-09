import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  financeDeductionsFetch,
  financeDeductionsResetState,
} from 'src/redux/actionCreators/report/financeDeductions';

const alwaysFetch = false;

const payloadDisplayName = 'Finance Deductions';

class FinanceDeductionsReportContainer extends React.Component {
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
    data: state.report.financeDeductions,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(financeDeductionsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(financeDeductionsResetState());
    },
  };
};

export default connect(
  FinanceDeductionsReportContainer,
  mapStateToProps,
  mapDispatchToProps
);
