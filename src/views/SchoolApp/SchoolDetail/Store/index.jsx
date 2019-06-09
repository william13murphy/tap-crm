import React from 'react';
import connect from 'src/redux/connect';
import Module from 'components/Layout/Module';
import PageNav from 'components/Layout/PageNav';
import { NavLink, Route, Redirect } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import Modal from 'components/Modal';

import OrderDetails from '../../../_shared/OrderDetails';
import Inventory from './Inventory';
import PurchaseHistory from './PurchaseHistory';
import './styles.less';

type SchoolStoreProps = {
  schoolId: string,
};

class SchoolStore extends React.Component {
  props: SchoolStoreProps;
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
    };
  }
  render() {
    return (
      <div className="SchoolStoreProps">
        <Module className="SchoolStoreModule" title="School Store">
          <PageNav>
            <TabList>
              <NavLink
                to={`${this.props.match.url}/inventory`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Inventory</Tab>
              </NavLink>
              <NavLink
                to={`${this.props.match.url}/purchase-history`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Purchase History</Tab>
              </NavLink>
            </TabList>
          </PageNav>
          <div>
            <div className="SchoolStoreTabs inner-tabs">
              <Route
                path={`${this.props.match.path}/inventory`}
                render={() => {
                  return <Inventory schoolId={this.props.schoolId} />;
                }}
              />
              <Route
                path={`${this.props.match.path}/purchase-history`}
                render={() => {
                  return <PurchaseHistory schoolId={this.props.schoolId} />;
                }}
              />
              <Route
                exact
                path={`${this.props.match.path}`}
                render={() => (
                  <Redirect to={`${this.props.match.url}/inventory`} />
                )}
              />
              <Route
                path={`${this.props.match.path}/purchase-history/:orderId`}
                render={innerProps => (
                  <Modal
                    title="Order Data"
                    closeUrl={`/app/school-app/${
                      innerProps.match.params.schoolId
                    }/school-detail/store/purchase-history`}
                  >
                    <OrderDetails
                      data={
                        innerProps.location.state.initialValues.OrderDetails
                      }
                      OrderId={innerProps.match.params.orderId}
                    />
                  </Modal>
                )}
              />
            </div>
          </div>
        </Module>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(
  SchoolStore,
  mapStateToProps
);
