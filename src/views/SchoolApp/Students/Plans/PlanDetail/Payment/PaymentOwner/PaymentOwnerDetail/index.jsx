import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

type PaymentOwnerDetailProps = {
  owner: any,
  routes: any,
};

const PaymentOwnerDetail = (props: PaymentOwnerDetailProps) => {
  return (
    <div className="PaymentOwnerDetail pt-card">
      <Link
        to={`${props.routes.url}/edit-account-owner`}
        className="EditAccountOwnerButton pt-button pt-intent-primary pt-icon-edit"
      >
        Add Account Owner
      </Link>
      <Link
        to={`${props.routes.url}/enroll-owner`}
        className="EnrollAccountOwnerButton pt-button pt-intent-primary pt-icon-edit"
      >
        Add Existing Account Owner
      </Link>
      <table className="AccountOwnerDetails default-table-shaded">
        <tbody>
          {props.owner.Title ? (
            <tr>
              <td>Title</td>
              <td>{props.owner.Title}</td>
            </tr>
          ) : null}
          {props.owner.Prefix ? (
            <tr>
              <td>Prefix</td>
              <td>{props.owner.Prefix}</td>
            </tr>
          ) : null}
          {props.owner.Suffix ? (
            <tr>
              <td>Suffix</td>
              <td>{props.owner.Suffix}</td>
            </tr>
          ) : null}
          {props.owner.PrefferedName ? (
            <tr>
              <td>Preferred Name</td>
              <td>{props.owner.PrefferedName}</td>
            </tr>
          ) : null}
          {props.owner.FirstName ? (
            <tr>
              <td>Name</td>
              <td>
                {props.owner.Prefix} {props.owner.FirstName}{' '}
                {props.owner.LastName}
              </td>
            </tr>
          ) : null}
          {props.owner.PhoneNumber ? (
            <tr>
              <td>Phone number</td>
              <td>{props.owner.PhoneNumber}</td>
            </tr>
          ) : null}
          {props.owner.MobileNumber ? (
            <tr>
              <td>Mobile Number</td>
              <td>{props.owner.MobileNumber}</td>
            </tr>
          ) : null}
          {props.owner.Email ? (
            <tr>
              <td>Email</td>
              <td>{props.owner.Email}</td>
            </tr>
          ) : null}
          {props.owner.Dob ? (
            <tr>
              <td>Date of Birth</td>
              <td>{moment(props.owner.Dob).format('MMMM Do, YYYY')}</td>
            </tr>
          ) : null}
          {props.owner.Address1 ? (
            <tr>
              <td>Address</td>
              <td>{props.owner.Address1}</td>
            </tr>
          ) : null}
          {props.owner.Address2 ? (
            <tr>
              <td />
              <td>{props.owner.Address2 + ','}</td>
            </tr>
          ) : null}
          <tr>
            <td />
            <td>
              {props.owner.City}, {props.owner.State} {props.owner.Zip}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentOwnerDetail;
