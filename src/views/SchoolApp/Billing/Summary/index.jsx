import React from 'react';
import connect from 'src/redux/connect';
import { Route, NavLink, Redirect } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageNav from 'components/Layout/PageNav';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';

import CurrentSummary from './CurrentSummary';
import PreviousSummary from './PreviousSummary';
import './styles.less';

const Summary = props => {
  return (
    <Page className="BillingSummaryPage">
      <PageHeader>
        <PageNav>
          <TabList>
            <NavLink
              to={`${props.match.url}/current`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Current</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/previous`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Previous</Tab>
            </NavLink>
          </TabList>
        </PageNav>
        <div>
          <TabRoutes>
            <Route
              exact
              path={`${props.match.path}`}
              render={() => <Redirect to={`${props.match.url}/current`} />}
            />
            <Route
              path={`${props.match.path}/current`}
              render={() => <CurrentSummary />}
            />
            <Route
              exact
              path={`${props.match.path}/previous`}
              render={() => <PreviousSummary />}
            />
          </TabRoutes>
        </div>
      </PageHeader>
    </Page>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  Summary,
  mapStateToProps
);
