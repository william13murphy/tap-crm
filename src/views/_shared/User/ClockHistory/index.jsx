import React from 'react';

import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolClockInOutsContainer from 'containers/School/SchoolClockInOutsContainer';
import ClockHistoryDataGrid from './ClockHistoryDataGrid';

type ClockHistoryPageProps = {
  clockInOuts: {
    payload: [],
  },
  token: {
    payload: {
      UserId: string,
    },
  },
};

const ClockHistory = (props: ClockHistoryPageProps) => {
  return (
    <Page className="ClockHistoryPage" title="Clock History">
      <PageHeader>
        <PageTitle>Clock History</PageTitle>
      </PageHeader>
      <PageBody>
        <SchoolClockInOutsContainer
          dispatchFetchParams={props.token.payload.UserId}
        >
          <ClockHistoryDataGrid data={props.clockInOuts.payload || []} />
        </SchoolClockInOutsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    clockInOuts: state.school.clockInOuts,
    token: state.token,
  };
};

export default connect(ClockHistory, mapStateToProps);
