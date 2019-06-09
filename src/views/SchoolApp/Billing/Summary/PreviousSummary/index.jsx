import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import AccountSummaryHealth from '../AccountSummaryHealth';
import SummaryByMonthByYearForm from '../SummaryByMonthByYearForm';

const PreviousSummary = props => {
  return (
    <Page className="PreviousSummaryPage">
      <PageHeader>
        <PageTitle>Previous Billing Summary</PageTitle>
      </PageHeader>

      <PageBody>
        <SummaryByMonthByYearForm schoolId={props.match.params.schoolId} />
        {props.accountSummary.payload && <AccountSummaryHealth />}
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
  PreviousSummary,
  mapStateToProps
);
