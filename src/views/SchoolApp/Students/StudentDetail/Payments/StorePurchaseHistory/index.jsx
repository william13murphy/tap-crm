import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import StudentPurchaseHistoryContainer from 'containers/PointOfSale/StudentPurchaseHistoryContainer';
import PurchaseHistoryDataGrid from '../../../../_shared/PurchaseHistoryDataGrid';

type StorePurchaseHistoryProps = {
  token: {
    payload: {
      StudentId: any,
      SchoolId: string,
    },
  },

  studentId: any,
  schoolId: string,
  studentPurchaseHistory: any,
};

class StorePurchaseHistory extends React.Component {
  props: StorePurchaseHistoryProps;
  render() {
    return (
      <Page className="StudentAccountPage" title="School Purchase History">
        <PageHeader>
          <PageTitle>Student Purchase History</PageTitle>
        </PageHeader>
        <PageBody>
          <StudentPurchaseHistoryContainer
            dispatchFetchParams={this.props.studentId}
          >
            <PurchaseHistoryDataGrid data={this.props.studentPurchaseHistory} />
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
  StorePurchaseHistory,
  mapStateToProps
);
