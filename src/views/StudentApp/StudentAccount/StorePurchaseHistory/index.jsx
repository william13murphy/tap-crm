import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import StudentPurchaseHistoryContainer from 'containers/PointOfSale/StudentPurchaseHistoryContainer';
import StorePurchaseHistoryDataGrid from './StorePurchaseHistoryDataGrid';

type StorePurchaseHistoryPageProps = {
  token: {
    payload: {
      studentId: any,
    },
  },
  studentPurchaseHistory: any,
};

class StorePurchaseHistoryPage extends React.Component {
  props: StorePurchaseHistoryPageProps;
  render() {
    return (
      <Page className="StudentAccountPage" title="School Purchase History">
        <PageHeader>
          <PageTitle>Store Purchase History</PageTitle>
        </PageHeader>
        <PageBody>
          <StudentPurchaseHistoryContainer
            dispatchFetchParams={this.props.token.payload.StudentId}
          >
            <StorePurchaseHistoryDataGrid
              data={this.props.studentPurchaseHistory}
            />
          </StudentPurchaseHistoryContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPurchaseHistory: state.pos.studentPurchaseHistory,
  };
};

export default connect(
  StorePurchaseHistoryPage,
  mapStateToProps
);
