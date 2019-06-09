import React from 'react';
import DataCard from 'components/DataCard';

type AddressCardProps = {
  addressTypeName?: string,
  editLink?: string,
  deleteLink?: string,
  countryName: string,
  address: {
    AddressTypeId: string,
    Address1: string,
    Address2?: string,
    City: string,
    County?: string,
    State: string,
    Zip: string,
    CountryId: string,
  },
};

const AddressCard = (props: AddressCardProps) => {
  return (
    <DataCard
      className="AddressCard"
      title={`${props.addressTypeName} Address`}
      editLink={props.editLink}
    >
      <div className="AddressCard__address1">{props.address.Address1}</div>
      <div className="AddressCard__address2">{props.address.Address2}</div>
      <div className="AddressCard__city-state-zip">
        <span>{props.address.City}, </span>
        <span>{props.address.State} </span>
        <span>{props.address.Zip}</span>
      </div>
      <div className="AddressCard__county-countryName">{props.countryName}</div>
    </DataCard>
  );
};

export default AddressCard;
