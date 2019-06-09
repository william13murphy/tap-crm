import React from 'react';
import { Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';

import ClientFormContainer from 'containers/Client/ClientFormContainer';
import ClientDetailContainer from 'containers/Client/ClientDetailContainer';
import ClientSchoolsContainer from 'containers/Client/ClientSchoolsContainer';
import ClientDeleteContainer from 'containers/Client/ClientDeleteContainer';
import { allClientsFetch } from 'src/redux/actionCreators/client/allClients';

import AllClients from './AllClients';
import AddClientForm from './AddClientForm';
import ClientDetail from './ClientDetail';
import './styles.less';

const ClientsModule = (props: { dispatchAllClientsFetch: any }) => {
  return (
    <Module className="ClientsModule">
      <Route exact={true} path="/app/clients" component={AllClients} />
      <Route
        path="/app/clients/add"
        render={() => {
          const CLOSE_URL = '/app/clients';
          return (
            <Modal title="Add New Client" closeUrl={CLOSE_URL}>
              <ClientFormContainer
                redirectOnSuccess={CLOSE_URL}
                dispatchActionOnCloseParams={props.dispatchAllClientsFetch}
              >
                <AddClientForm />
              </ClientFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        path="/app/clients/detail/:id"
        render={routerProps => (
          <ClientSchoolsContainer
            dispatchFetchParams={routerProps.match.params.id}
          >
            <ClientDetailContainer
              dispatchFetchParams={routerProps.match.params.id}
            >
              <ClientDetail />
            </ClientDetailContainer>
          </ClientSchoolsContainer>
        )}
      />
      <Route
        path={`${props.match.path}/delete/:clientId`}
        render={innerProps => (
          <Modal title="Delete Client" closeUrl={props.match.url}>
            <ClientDeleteContainer redirectOnSuccess={props.match.url}>
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={props.match.url}
                id={innerProps.match.params.clientId}
              />
            </ClientDeleteContainer>
          </Modal>
        )}
      />
    </Module>
  );
};

function mapStateToProps(state) {
  return {
    allClients: state.client.allClients,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAllClientsFetch: () => {
      dispatch(allClientsFetch());
    },
  };
};

export default connect(
  ClientsModule,
  mapStateToProps,
  mapDispatchToProps
);
