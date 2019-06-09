import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import StudentPaymentHistoryContainer from 'containers/Report/StudentPaymentHistoryContainer';
import PaymentsGrid from './PaymentsGrid';

type PaymentHistoryProps = {
  match: {
    params: {
      studentId: string,
    },
  },
  studentPaymentHistory: {
    payload: Array<{}>,
  },
};

const PaymentHistory = (props: PaymentHistoryProps) => {
  return (
    <Page className="PaymentHistoryPage" title="PaymentHistory">
      <PageHeader>
        <PageTitle>Payments</PageTitle>
      </PageHeader>
      <PageBody>
        <StudentPaymentHistoryContainer
          dispatchFetchParams={props.match.params.studentId}
        >
          <PaymentsGrid data={props.studentPaymentHistory.payload} />
        </StudentPaymentHistoryContainer>
      </PageBody>
    </Page>
  );
};
const mapStateToProps = state => {
  return {
    studentPaymentHistory: state.report.studentPaymentHistory,
  };
};

export default connect(
  PaymentHistory,
  mapStateToProps
);
