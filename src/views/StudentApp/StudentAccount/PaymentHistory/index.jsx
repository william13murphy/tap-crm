import React from 'react';
import connect from 'src/redux/connect';

import TabList from 'components/TabList';
import Tab from 'components/Tab';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import PaymentHistoryDataGrid from './PaymentHistoryDataGrid';
import StudentPaymentHistoryContainer from 'containers/Report/StudentPaymentHistoryContainer';

type PaymentHistoryProps = {};

const PaymentHistory = (props: PaymentHistoryProps) => {
  return (
    <Page className="PaymentHistory" title="Payment History">
      <PageHeader>
        <PageTitle>Payments</PageTitle>
      </PageHeader>
      <PageBody>
        <StudentPaymentHistoryContainer
          dispatchFetchParams={props.token.payload.StudentId}
        >
          <PaymentHistoryDataGrid data={props.studentPaymentHistory.payload} />
        </StudentPaymentHistoryContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPaymentHistory: state.report.studentPaymentHistory,
  };
};

export default connect(
  PaymentHistory,
  mapStateToProps
);
