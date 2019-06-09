import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import SchoolPurchaseHistoryContainer from 'containers/PointOfSale/SchoolPurchaseHistoryContainer';
import PurchaseHistoryDataGrid from '../../../_shared/PurchaseHistoryDataGrid';

type SchoolPurchaseHistoryPageProps = {
  schoolId: any,
  schoolPurchaseHistory: any,
};

class SchoolPurchaseHistoryPage extends React.Component {
  props: SchoolPurchaseHistoryPageProps;
  render() {
    return (
      <Page className="StudentAccountPage" title="School Purchase History">
        <PageHeader>
          <PageTitle>School Purchase History</PageTitle>
        </PageHeader>
        <PageBody>
          <SchoolPurchaseHistoryContainer
            dispatchFetchParams={this.props.schoolId}
          >
            <PurchaseHistoryDataGrid data={this.props.schoolPurchaseHistory} />
          </SchoolPurchaseHistoryContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolPurchaseHistory: state.pos.schoolPurchaseHistory,
  };
};

export default connect(
  SchoolPurchaseHistoryPage,
  mapStateToProps
);
