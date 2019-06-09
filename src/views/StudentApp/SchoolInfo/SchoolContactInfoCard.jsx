import React from 'react';
import {
  getCountryNameFromId,
  getAddressTypeNameFromId,
} from 'api/referenceItems';

type SchoolContactInfoCardProps = {
  data: {
    PrimaryPhone: string,
    Email: string,
    Addresses: [],
  },

  references: {},
};

const SchoolContactInfoCard = (props: SchoolContactInfoCardProps) => (
  <div className="InfoCard">
    <div className="InfoCard__header">
      <h3>School Contact Information</h3>
    </div>
    <div className="InfoCard__body">
      <div className="InfoCardTable">
        <table className="TimelineTable">
          <tbody>
            <tr>
              <td>
                <strong>Address</strong>
              </td>
              {props.data.Addresses.map(item => {
                let { Address } = item;
                let countryName = getCountryNameFromId(
                  props.references,
                  Address.CountryId
                );

                return (
                  <td key={Address.Id}>
                    <div>{Address.Address1}</div>
                    {Address.Address2 && <div>{Address.Address2}</div>}
                    <div>
                      {Address.City}, {Address.State}, {Address.Zip},{' '}
                      {countryName}
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>
                <strong>Phone</strong>
              </td>
              <td>{props.data.PrimaryPhone}</td>
            </tr>
            <tr>
              <td>
                <strong>Email</strong>
              </td>
              <td>{props.data.Email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SchoolContactInfoCard;
