import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ConfirmDialog from 'components/ConfirmDialog';

import Modal from 'components/Modal';

import ClientContactSaveFormContainer from 'containers/Client/ClientContactSaveFormContainer';
import ClientContactDeleteContainer from 'containers/Client/ClientContactDeleteContainer';

import { referencesFetch } from 'src/redux/actionCreators/references';

import AddExternalClientContactForm from './AddExternalClientContactForm';
import AddInternalClientContactForm from './AddInternalClientContactForm';
import ExternalClientContactsDataGrid from './ExternalClientContactsDataGrid';
import InternalClientContactsDataGrid from './InternalClientContactsDataGrid';
import EfcUsersContainer from 'containers/Administration/EfcUsersContainer';
import './styles.less';

type ClientContactsProps = {
  id: string,
  internalContacts: [],
  externalContacts: [],
  history: {},
  token: {
    payload: {
      UserId: string,
    },
  },
  title: string,
  dispatchReferencesFetch: any,
};

class ClientContacts extends React.Component {
  props: ClientContactsProps;
  renderInternalContacts() {
    if (this.props.internalContacts && this.props.internalContacts.length > 0) {
      return (
        <div className="ClientContacts__internal">
          <h3 className="ClientContacts__title">
            EFC Contact
            {this.props.internalContacts.length > 1 ? 's' : ''}
          </h3>
          <InternalClientContactsDataGrid
            data={this.props.internalContacts}
            history={this.props.history}
          />
        </div>
      );
    } else {
      return (
        <div className="ClientContacts__internal">
          <h3 className="ClientContacts__title">EFC Contacts</h3>
          <div>No EFC Contacts found.</div>
        </div>
      );
    }
  }
  renderExternalContacts() {
    if (this.props.externalContacts && this.props.externalContacts.length > 0) {
      return (
        <div className="ClientContacts__external">
          <h3 className="ClientContacts__title">
            Client Contact
            {this.props.externalContacts.length > 1 ? 's' : ''}
          </h3>
          <ExternalClientContactsDataGrid
            data={this.props.externalContacts}
            history={this.props.history}
          />
        </div>
      );
    } else {
      return (
        <div className="ClientContacts__external">
          <h3 className="ClientContacts__title">Client Contacts</h3>
          <div>No Client Contacts found.</div>
        </div>
      );
    }
  }
  render() {
    return (
      <Page className="ClientContactsPage" title="Contacts">
        <Route
          path="/app/clients/detail/:id/contacts/add/internal"
          render={() => {
            const CLOSE_URL = `/app/clients/detail/${this.props.id}/contacts`;

            return (
              <Modal title="Add EFC Contact" closeUrl={CLOSE_URL}>
                <EfcUsersContainer>
                  <ClientContactSaveFormContainer
                    dispatchActionOnClose={this.props.dispatchReferencesFetch}
                    redirectOnSuccess={CLOSE_URL}
                  >
                    <AddInternalClientContactForm clientId={this.props.id} />
                  </ClientContactSaveFormContainer>
                </EfcUsersContainer>
              </Modal>
            );
          }}
        />
        <Route
          path="/app/clients/detail/:id/contacts/add/external"
          render={() => {
            const CLOSE_URL = `/app/clients/detail/${this.props.id}/contacts`;

            return (
              <Modal title="Add Client Contact" closeUrl={CLOSE_URL}>
                <ClientContactSaveFormContainer
                  dispatchActionOnClose={this.props.dispatchReferencesFetch}
                  redirectOnSuccess={CLOSE_URL}
                >
                  <AddExternalClientContactForm clientId={this.props.id} />
                </ClientContactSaveFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          exact
          path={`/app/clients/detail/:clientId/contacts/delete/:contactId`}
          render={innerProps => {
            return (
              <Modal
                title="Delete Client Contact"
                closeUrl={this.props.match.url}
              >
                <ClientContactDeleteContainer
                  redirectOnSuccess={this.props.match.url}
                  dispatchActionOnCloseParams={this.props.id}
                >
                  <ConfirmDialog
                    title="Are you sure you want to delete?"
                    closeUrl={`/app/clients/detail/${
                      innerProps.match.params.clientId
                    }/contacts`}
                    id={innerProps.match.params.contactId}
                  />
                  {/* <div>Delete the Contact</div> */}
                </ClientContactDeleteContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <PageTitle inline>{this.props.title}</PageTitle>
          <Link
            to={`/app/clients/detail/${this.props.id}/contacts/add/internal`}
            className="pt-button pt-intent-primary pt-icon-phone"
          >
            Add EFC Contact
          </Link>{' '}
          <Link
            to={`/app/clients/detail/${this.props.id}/contacts/add/external`}
            className="pt-button pt-intent-primary pt-icon-phone"
          >
            Add Client Contact
          </Link>
        </PageHeader>
        <PageBody>
          {this.renderInternalContacts()}
          {this.renderExternalContacts()}
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchReferencesFetch: () => {
      dispatch(referencesFetch());
    },
  };
};

export default connect(
  ClientContacts,
  mapStateToProps,
  mapDispatchToProps
);
