import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import Breadcrumbs from 'components/Breadcrumbs';
import Tab from 'components/Tab';
import TabList from 'components/TabList';

import ClientSummary from './ClientSummary';
import ClientAddresses from './ClientAddresses';
import ClientContactsContainer from './ClientContacts/Container';
import ClientContacts from './ClientContacts';
import AddSchoolForm from 'views/EFCApp/AllSchools/AddSchool/AddSchoolForm';
import CreateSchoolFormContainer from 'containers/School/CreateSchoolFormContainer';

import ClientNotes from './ClientNotes';
import ClientSchools from './ClientSchools';
import './styles.less';

const breadcrumbsData = [
  {
    to: '/app/clients',
    label: 'All Clients',
    current: false,
  },
  {
    label: 'Client Detail',
    current: true,
  },
];

type ClientDetailPageProps = {
  clientDetail: {
    payload: Array<{}> | {},
  },
  match: {
    params: {
      id: number,
    },
  },
  clientSchools: [{}],
};

class ClientDetailPage extends React.Component {
  props: ClientDetailPageProps;
  render() {
    const clientId = this.props.match.params.id;
    return (
      <Module className="ClientDetailModule">
        {/*this.renderModal()*/}
        <SubNav>
          <Breadcrumbs list={breadcrumbsData} />

          <TabList>
            <NavLink
              to={`/app/clients/detail/${clientId}/summary`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Summary</Tab>
            </NavLink>
            <NavLink
              to={`/app/clients/detail/${clientId}/addresses`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Addresses</Tab>
            </NavLink>
            <NavLink
              to={`/app/clients/detail/${clientId}/contacts`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Contacts</Tab>
            </NavLink>
            <NavLink
              to={`/app/clients/detail/${clientId}/schools`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Schools</Tab>
            </NavLink>
            <NavLink
              to={`/app/clients/detail/${clientId}/notes`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Notes</Tab>
            </NavLink>
          </TabList>
        </SubNav>
        <Route
          path="/app/clients/detail/:id/summary"
          render={() => (
            <ClientSummary title={this.props.clientDetail.payload.Name || ''} />
          )}
        />
        <Route
          path="/app/clients/detail/:id/addresses"
          render={() => (
            <ClientAddresses
              title={this.props.clientDetail.payload.Name || ''}
              clientDetail={this.props.clientDetail}
            />
          )}
        />

        <Route
          path="/app/clients/detail/:id/contacts"
          render={() => (
            <ClientContactsContainer>
              <ClientContacts
                title={this.props.clientDetail.payload.Name || ''}
              />
            </ClientContactsContainer>
          )}
        />

        <Route
          path="/app/clients/detail/:id/schools"
          component={innerProps => (
            <ClientSchools
              title={this.props.clientDetail.payload.Name || ''}
              clientSchools={this.props.clientSchools}
              clientId={clientId}
              {...innerProps}
            />
          )}
        />

        <Route
          path={`/app/clients/detail/:id/schools/add-school`}
          render={() => {
            return (
              <Modal
                title="Add New School"
                closeUrl={`/app/clients/detail/${clientId}/schools`}
              >
                <CreateSchoolFormContainer
                  dispatchActionOnCloseParams={clientId}
                  redirectOnSuccess={`/app/clients/detail/${clientId}/schools`}
                >
                  <AddSchoolForm clientId={clientId} />
                </CreateSchoolFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          path="/app/clients/detail/:id/notes"
          component={() => (
            <ClientNotes
              title={this.props.clientDetail.payload.Name || ''}
              clientDetail={this.props.clientDetail}
            />
          )}
        />
      </Module>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientDetail: state.client.detail,
    clientSchools: state.client.schools,
  };
}

export default connect(
  ClientDetailPage,
  mapStateToProps
);
