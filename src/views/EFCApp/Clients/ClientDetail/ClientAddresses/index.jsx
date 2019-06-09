import React from 'react';
import { Link, Route } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import Modal from 'components/Modal';
import ClientAddressFormContainer from 'containers/Client/ClientAddressFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import AddClientAddressForm from './AddClientAddressForm';
import AddressCards from './AddressCards';
import './styles.less';

type ClientAddressesProps = {
  clientDetail: {
    payload: {
      Id: string,
      Addresses: Array<{
        Address: {},
      }>,
    },
  },
  title: string,
};

class ClientAddresses extends React.Component {
  props: ClientAddressesProps;
  renderAddressCards() {
    if (this.props.clientDetail.payload.Addresses) {
      return <AddressCards />;
    } else {
      return <div>No addresses found</div>;
    }
  }
  render() {
    return (
      <Page className="ClientAddressesPage" title="Addresses">
        <Route
          path="/app/clients/detail/:id/addresses/add"
          render={() => {
            const CLOSE_URL = `/app/clients/detail/${
              this.props.clientDetail.payload.Id
            }/addresses`;

            return (
              <Modal title="Add Client Address" closeUrl={CLOSE_URL}>
                <StateProvinceMasterContainer>
                  <ClientAddressFormContainer
                    dispatchActionOnCloseParams={
                      this.props.clientDetail.payload.Id
                    }
                    redirectOnSuccess={CLOSE_URL}
                  >
                    <AddClientAddressForm
                      clientId={this.props.clientDetail.payload.Id}
                    />
                  </ClientAddressFormContainer>
                </StateProvinceMasterContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <PageTitle inline>{this.props.title}</PageTitle>
          <Link
            to={`/app/clients/detail/${
              this.props.clientDetail.payload.Id
            }/addresses/add`}
            className="pt-button pt-intent-primary"
          >
            <i className="fa fa-address-book" />
            Add New Address
          </Link>
        </PageHeader>
        <PageBody>{this.renderAddressCards()}</PageBody>
      </Page>
    );
  }
}

export default ClientAddresses;
