import Module from 'components/Layout/Module';
import PageNav from 'components/Layout/PageNav';
import Tab from 'components/Tab';
import TabList from 'components/TabList';
import TabRoutes from 'components/TabRoutes';
import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import DirectMessages from './DirectMessages';
import Outbox from './Outbox';
import './styles.less';




type MessagesModuleProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
};

const MessagesModule = (props: MessagesModuleProps) => {
  return (
    <div className='Page'>
      <Module className="MessagesModule">
        <PageNav>
          <div className="breadcrumbs-placeholder" />
          <TabList>
            <NavLink
              to={`${props.match.url}/direct`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Direct Messages</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/outbox`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Outbox</Tab>
            </NavLink>
          </TabList>
        </PageNav>
        <div>
          <TabRoutes>
            <Route
              exact
              path={`${props.match.path}`}
              render={() => <Redirect to={`${props.match.url}/direct`} />}
            />
            <Route
              path={`${props.match.path}/direct`}
              render={() => <DirectMessages />}
            />
            <Route
              exact
              path={`${props.match.path}/outbox`}
              render={() => <Outbox />}
            />
          </TabRoutes>
        </div>
      </Module>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  MessagesModule,
  mapStateToProps
);
