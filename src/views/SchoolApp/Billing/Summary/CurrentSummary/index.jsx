import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import InputBlock from 'components/Forms/InputBlock';
import DataCard from 'components/DataCard';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import SchoolAccountSummaryContainer from 'containers/School/SchoolAccountSummaryContainer';
import BillingByDateContainer from 'containers/Report/BillingByDateContainer';
import DeclineByDateContainer from 'containers/Report/DeclineByDateContainer';

import DeclineByDate from 'views/SchoolApp/Reports/DeclineByDate';
import BillingByDate from 'views/SchoolApp/Reports/BillingByDate';
import AccountSummaryHealth from '../AccountSummaryHealth';

const CurrentSummary = props => {
  const schoolId = props.match.params.schoolId;
  const currentMonth = moment().format('M');
  const currentYear = moment().format('YYYY');

  return (
    <Page className="CurrentSummaryPage">
      <PageHeader>
        <PageTitle>Current Billing Summary</PageTitle>
      </PageHeader>

      <PageBody>
        <SchoolAccountSummaryContainer
          dispatchFetchParams={{
            SchoolId: props.match.params.schoolId,
            Month: currentMonth,
            Year: currentYear,
          }}
        >
          {props.accountSummary.payload ? (
            <AccountSummaryHealth />
          ) : (
            <NoDataMessage errorMessage="No Account Summary Found" />
          )}
        </SchoolAccountSummaryContainer>
        <InputBlock>
          <DataCard title="Total Billed in Past Week">
            <BillingByDateContainer dispatchFetchParams={schoolId}>
              <BillingByDate columns={2} />
            </BillingByDateContainer>
          </DataCard>
          <DataCard title="Declined Payments in Past Week">
            <DeclineByDateContainer dispatchFetchParams={schoolId}>
              <DeclineByDate columns={2} />
            </DeclineByDateContainer>
          </DataCard>
        </InputBlock>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    accountSummary: state.school.accountSummary,
  };
};

export default connect(
  CurrentSummary,
  mapStateToProps
);
