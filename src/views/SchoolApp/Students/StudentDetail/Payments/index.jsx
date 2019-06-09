import Module from 'components/Layout/Module';
import PageNav from 'components/Layout/PageNav';
import Modal from 'components/Modal';
import Tab from 'components/Tab';
import TabList from 'components/TabList';
import TabRoutes from 'components/TabRoutes';
import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { localCurrencyValue } from 'util/localization/localValues';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PaymentHistory from './PaymentHistory';
import StorePurchaseHistory from './StorePurchaseHistory';
import OrderDetails from 'views/_shared/OrderDetails';
import './styles.less';


type PaymentsModuleProps = {
  match: { params: { schoolId: string, studentId: string }, url: any },
  studentDetail: {
    payload: {
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
      schoolId: string,
    },
  },
};

const PaymentsModule = (props: PaymentsModuleProps) => {
  return (
    <div className='Page'>
      <Module className="PaymentsModule">
        <PageNav>
          <div className="breadcrumbs-placeholder" />
          <TabList>
            <NavLink
              to={`/app/school-app/${
                props.studentDetail.payload.SchoolId
                }/students/detail/${
                props.studentDetail.payload.Id
                }/payments/payment-history`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Payment History</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.studentDetail.payload.SchoolId
                }/students/detail/${
                props.studentDetail.payload.Id
                }/payments/store-purchase-history`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Store Purchase History</Tab>
            </NavLink>
          </TabList>
        </PageNav>
        <Route
          exact
          path={`${props.match.path}/store-purchase-history/:orderId`}
          render={innerProps => (
            <Modal
              title="Order Details"
              closeUrl={`/app/school-app/${
                props.match.params.schoolId
                }/students/detail/${
                props.match.params.studentId
                }/payments/store-purchase-history`}
            >
              <OrderDetails
                OrderId={innerProps.match.params.orderId}
                data={innerProps.location.state.initialValues.OrderDetails}
              />
              <div className="OrderDetailsFooter">
                <div className="FooterRow">
                  <div className="FooterTitle">Tax</div>
                  <div className="FooterValue">{`${localCurrencyValue(
                    innerProps.location.state.initialValues.Tax
                  )}`}
                  </div>
                </div>
                <div className="FooterRow">
                  <div className="FooterTitle">Grand Total</div>
                  <div className="FooterValue">{`${localCurrencyValue(
                    innerProps.location.state.initialValues.TotalPrice
                  )}`}</div>
                </div>
              </div>
            </Modal>
          )}
        />
        <div>
          <TabRoutes>
            <Route
              exact
              path="/app/school-app/:schoolId/students/detail/:studentId/payments"
              render={() => (
                <Redirect
                  to={`/app/school-app/${
                    props.match.params.schoolId
                    }/students/detail/${
                    props.studentDetail.payload.Id
                    }/payments/payment-history`}
                />
              )}
            />
            <Route
              path="/app/school-app/:schoolId/students/detail/:studentId/payments/payment-history"
              render={() => <PaymentHistory />}
            />
            <Route
              exact
              path="/app/school-app/:schoolId/students/detail/:studentId/payments/store-purchase-history"
              render={innerProps => (
                <StorePurchaseHistory
                  studentId={innerProps.match.params.studentId}
                  schoolId={innerProps.match.params.schoolId}
                />
              )}
            />
          </TabRoutes>
        </div>
      </Module>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
  };
};

export default connect(
  PaymentsModule,
  mapStateToProps
);
