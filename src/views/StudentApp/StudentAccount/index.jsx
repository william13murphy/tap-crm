import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PageNav from 'components/Layout/PageNav';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import Modal from 'components/Modal';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import DataCard from 'components/DataCard';
import PaymentHistoryPage from './PaymentHistory';
import StorePurchaseHistoryPage from './StorePurchaseHistory';
import './styles.less';

import OrderDetails from 'views/_shared/OrderDetails';

const StudentAccountModule = () => {
  return (
    <div>
      <Module className="StudentAccountModule">
        <PageNav>
          <div className="breadcrumbs-placeholder" />
          <TabList>
            <NavLink
              to={`/app/account/payment-history`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Payment History</Tab>
            </NavLink>
            <NavLink
              to={`/app/account/store-purchase-history`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Store Purchase History</Tab>
            </NavLink>
          </TabList>
        </PageNav>
        <Route
          // exact
          path="/app/account/store-purchase-history/:orderId"
          render={innerProps => (
            <Modal
              title="Order Data"
              closeUrl={`/app/account/store-purchase-history/`}
            >
              <OrderDetails OrderId={innerProps.match.params.orderId} />
            </Modal>
          )}
        />
        <Route
          exact
          path="/app/account"
          render={() => <Redirect to={`/app/account/payment-history`} />}
        />
        <Route
          path="/app/account/payment-history"
          render={() => <PaymentHistoryPage />}
        />
        <Route
          path="/app/account/store-purchase-history"
          render={() => <StorePurchaseHistoryPage />}
        />
      </Module>
    </div>
  );
};

export default StudentAccountModule;
