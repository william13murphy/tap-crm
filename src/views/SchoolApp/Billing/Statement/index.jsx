import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolAccountStatementContainer from 'containers/School/SchoolAccountStatementContainer';

import StatementByMonthByYearForm from './StatementByMonthByYearForm';
import AccountHealth from './AccountHealth';
import CommissionsReceivedDataGrid from './CommissionsReceivedDataGrid';
import PaymentsMadeDataGrid from './PaymentsMadeDataGrid';
import PaymentsReceivedDataGrid from './PaymentsReceivedDataGrid';
import WithdrawalsDataGrid from './WithdrawalsDataGrid';
import './styles.less';

const StatementPage = props => {
  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');

  return (
    <Page className="BillingStatementPage">
      <PageHeader>
        <PageTitle>Billing Statement</PageTitle>
      </PageHeader>
      <PageBody>
        <SchoolAccountStatementContainer
          dispatchFetchParams={{
            SchoolId: props.match.params.schoolId,
            Month: currentMonth,
            Year: currentYear,
          }}
        >
          <StatementByMonthByYearForm schoolId={props.match.params.schoolId} />
          {props.accountStatement && (
            <div className="StatementDetails">
              <AccountHealth />
              <h2 className="StatementSectionTitle">Payments Received</h2>
              <PaymentsReceivedDataGrid
                data={
                  props.accountStatement.payload &&
                  props.accountStatement.payload.PaymentsReceived
                }
              />
              <h2 className="StatementSectionTitle">Commission Received</h2>
              <CommissionsReceivedDataGrid
                data={
                  props.accountStatement.payload &&
                  props.accountStatement.payload.CommissionsReceived
                }
              />
              <h2 className="StatementSectionTitle">Withdrawals</h2>
              <WithdrawalsDataGrid
                data={
                  props.accountStatement.payload &&
                  props.accountStatement.payload.Withdrawals
                }
              />
              <h2 className="StatementSectionTitle">Payments Made</h2>
              <PaymentsMadeDataGrid
                data={
                  props.accountStatement.payload &&
                  props.accountStatement.payload.PaymentsMade
                }
              />
            </div>
          )}
        </SchoolAccountStatementContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    accountStatement: state.school.accountStatement,
  };
};

export default connect(
  StatementPage,
  mapStateToProps
);
