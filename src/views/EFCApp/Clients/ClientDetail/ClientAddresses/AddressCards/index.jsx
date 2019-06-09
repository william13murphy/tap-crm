import React from 'react';
import connect from 'src/redux/connect';
import {
  getCountryNameFromId,
  getAddressTypeNameFromId,
} from 'api/referenceItems';
import AddressCard from 'components/AddressCard';

import AddClientAddress from '../AddClientAddressForm';
import ClientAddressFormContainer from 'containers/Client/ClientAddressFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import { Route } from 'react-router-dom';
import Modal from 'components/Modal';

type AddressCardsProps = {
  clientDetail: {
    payload: {
      Id: string,
      Addresses: Array<{
        Address: {},
      }>,
    },
  },
  references: Array<{}>,
  preferredOnly: boolean,
};

const tempPreferredAddressId = '9f131320-420b-43cc-af22-0d60400fe8dd';

const tempInitialValues = {
  // used to populate "account" reducer when "Load" is clicked
  Address1: '123 test street',
};

class AddressCards extends React.Component {
  props: AddressCardsProps;
  getCountryName(cV) {
    return getCountryNameFromId(this.props.references, cV.Address.CountryId);
  }
  getAddressTypeName(cV) {
    return getAddressTypeNameFromId(
      this.props.references,
      cV.Address.AddressTypeId
    );
  }
  renderAddressCards() {
    if (this.props.clientDetail.payload.Addresses) {
      // Find address type name, pass it to AddressCard component, and render.
      return this.props.clientDetail.payload.Addresses.map((cV, i) => {
        const addressTypeName = this.getAddressTypeName(cV);
        const countryName = this.getCountryName(cV);

        if (this.props.preferredOnly) {
          if (cV.Address.AddressTypeId === tempPreferredAddressId) {
            return (
              <li className="AddressCard__wrapper" key={i}>
                <AddressCard
                  key={i}
                  countryName={countryName}
                  addressTypeName={addressTypeName}
                  address={cV.Address}
                />
              </li>
            );
          }
        } else {
          const EDIT_FORM_PATH = `/app/clients/detail/${
            cV.ClientId
          }/addresses/edit/${cV.Address.Id}`;
          return (
            <li className="AddressCard__wrapper" key={i}>
              <Route
                path={EDIT_FORM_PATH}
                render={() => {
                  const CLOSE_URL = `/app/clients/detail/${
                    this.props.clientDetail.payload.Id
                  }/addresses`;

                  return (
                    <Modal title="Edit Client Address" closeUrl={CLOSE_URL}>
                      <StateProvinceMasterContainer>
                        <ClientAddressFormContainer
                          dispatchActionOnCloseParams={
                            this.props.clientDetail.payload.Id
                          }
                          redirectOnSuccess={CLOSE_URL}
                        >
                          <AddClientAddress
                            clientId={this.props.clientDetail.payload.Id}
                            initialValues={cV}
                          />
                        </ClientAddressFormContainer>
                      </StateProvinceMasterContainer>
                    </Modal>
                  );
                }}
              />
              <AddressCard
                countryName={countryName}
                addressTypeName={addressTypeName}
                editLink={EDIT_FORM_PATH}
                address={cV.Address}
              />
            </li>
          );
        }
      });
    } else {
      return null;
    }
  }
  render() {
    return <ul className="AddressCards">{this.renderAddressCards()}</ul>;
  }
}

function mapStateToProps(state) {
  return {
    clientDetail: state.client.detail,
    references: state.utility.references,
  };
}

export default connect(
  AddressCards,
  mapStateToProps
);
