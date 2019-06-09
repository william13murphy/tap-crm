import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import AllClientsContainer from 'containers/Client/AllClientsContainer';
import ClientsDataGrid from './ClientsDataGrid';

import { allClientsFetch } from 'src/redux/actionCreators/client/allClients';
import './styles.less';

type AllClientsPageProps = {
  allClients: {
    payload: Array<{}> | {},
  },
  history: {},
};

const AllClientsPage = (props: AllClientsPageProps) => {
  return (
    <Page className="AllClientsPage" title="All Clients">
      <PageHeader>
        <PageTitle inline>All Clients</PageTitle>
        <Link to="/app/clients/add">
          <button className="pt-button pt-intent-primary pt-icon-new-person">
            Add New Client
          </button>
        </Link>
      </PageHeader>
      <PageBody>
        <AllClientsContainer>
          <ClientsDataGrid data={props.allClients} history={props.history} />
        </AllClientsContainer>
      </PageBody>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    allClients: state.client.allClients,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchClientsFetch: () => {
      dispatch(allClientsFetch());
    },
  };
};

export default connect(
  AllClientsPage,
  mapStateToProps,
  mapDispatchToProps
);
