import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import { roles } from 'util/auth/roles';

import Modal from 'components/Modal';
import SchoolAddressFormContainer from 'containers/School/SchoolAddressFormContainer';
import AddSchoolAddressForm from './AddSchoolAddressForm';

import DataCard from 'components/DataCard';
import AddressCard from 'components/AddressCard';
import PrivateComponent from 'components/Auth/PrivateComponent';
import SchoolAddressesContainer from 'containers/School/SchoolAddressesContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';

type SchoolAddressesProps = {
  schoolId: string,
  schoolAddresses: {
    payload: {},
  },
  dispatchSchoolAddressesFetch: any,
};

const SchoolAddresses = (props: SchoolAddressesProps) => {
  return (
    <div className="SchoolAddresses">
      <Route
        path={`${props.match.path}/add`}
        render={() => (
          <Modal title="Add School Address" closeUrl={props.match.url}>
            <StateProvinceMasterContainer>
              <SchoolAddressFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={props.match.url}
              >
                <AddSchoolAddressForm schoolId={props.schoolId} />
              </SchoolAddressFormContainer>
            </StateProvinceMasterContainer>
          </Modal>
        )}
      />
      <div>
        <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
          <Link to={`${props.match.url}/add`}>
            <button className="pt-button pt-icon-plus">Add New Address</button>
          </Link>
        </PrivateComponent>
        <SchoolAddressesContainer dispatchFetchParams={props.schoolId}>
          {props.schoolAddresses.payload ? (
            props.schoolAddresses.payload.map((address, i) => {
              return (
                <div className="AddressCardWrapper" key={i}>
                  <Route
                    path={`${props.match.path}/${address.Id}/edit`}
                    render={() => (
                      <Modal
                        title="Edit School Address"
                        closeUrl={props.match.url}
                      >
                        <StateProvinceMasterContainer>
                          <SchoolAddressFormContainer
                            dispatchActionOnCloseParams={props.schoolId}
                            redirectOnSuccess={props.match.url}
                          >
                            <AddSchoolAddressForm
                              schoolId={props.schoolId}
                              initialValues={address}
                            />
                          </SchoolAddressFormContainer>
                        </StateProvinceMasterContainer>
                      </Modal>
                    )}
                  />

                  <AddressCard
                    address={address.Address}
                    addressTypeName=""
                    editLink={`${props.match.url}/${address.Id}/edit`}
                  />
                </div>
              );
            })
          ) : (
            <div>No addresses found.</div>
          )}
        </SchoolAddressesContainer>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  schoolAddresses: state.school.addresses,
});

export default connect(
  SchoolAddresses,
  mapStateToProps
);
