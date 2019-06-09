import React from 'react';
import connect from 'src/redux/connect';
import { Route, NavLink, Redirect } from 'react-router-dom';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import SummaryPage from './Summary';
import StatementPage from './Statement';
import './styles.less';

type BillingModuleProps = {
  match: { params: { schoolId: string } },
};

const BillingModule = (props: BillingModuleProps) => {
  return (
    <Module className="BillingModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            to={`${props.match.url}/summary`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Summary</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/statement`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Statement</Tab>
          </NavLink>
        </TabList>
      </SubNav>
      <Route
        exact
        path={props.match.path}
        render={() => <Redirect to={`${props.match.url}/summary`} />}
      />
      <Route
        path={`${props.match.path}/summary`}
        render={() => <SummaryPage />}
      />
      <Route
        path={`${props.match.path}/statement`}
        render={() => <StatementPage />}
      />
    </Module>
  );
};

export default BillingModule;
