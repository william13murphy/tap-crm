import AvatarBlank from 'assets/images/avatar_blank.png';
import Modal from 'components/Modal';
import ClientFormContainer from 'containers/Client/ClientFormContainer';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import EditClientPictureForm from './EditClientPictureForm';
import './styles.less';


type ClientProfileCardProps = {
  payload: {
    Id: string,
    Name: string,
    CountryId?: string,
    RegionId?: string,
    TimeZoneId?: string,
    PrimaryPhone?: string,
    SecondaryPhone?: string,
    Email?: string,
    Fax?: string,
    Logo?: string,
    LogoHeader?: string,
    TaxId?: string,
    Duns?: string,
    Url?: string,
  },
  match: {
    path: string,
    url: string,
  },
};

const ClientProfileCard = (props: ClientProfileCardProps) => {
  const profilePicture = props.clientDetail.payload.LogoBlobUrl || AvatarBlank;
  return (
    <div className="ClientProfileCard">
      <Route
        path={`/app/clients/detail/${
          props.clientDetail.payload.Id
        }/summary/edit-picture`}
        render={() => (
          <Modal
            title="Edit Client Picture"
            closeUrl={`/app/clients/detail/${
              props.clientDetail.payload.Id
            }/summary`}
          >
            <ClientFormContainer
              dispatchActionOnClose={props.dispatchClientDetailFetch}
              dispatchActionOnCloseParams={props.clientDetail.payload.Id}
              redirectOnSuccess={`/app/clients/detail/${
                props.clientDetail.payload.Id
              }/summary`}
              update={true}
            >
              <EditClientPictureForm
                initialValues={props.clientDetail.payload}
              />
            </ClientFormContainer>
          </Modal>
        )}
      />
      <div className="one-third-two-third">
        <div className="one-third">
          <div className="ProfileCard__picture__container">
            <img className="ProfileCard__picture" src={profilePicture} />
            <Link
              to={`/app/clients/detail/${
                props.clientDetail.payload.Id
              }/summary/edit-picture`}
            >
              <button className="ProfileCard__picture__edit pt-button pt-icon-style" />
            </Link>
          </div>
        </div>
        <div className="two-third Profile__details">
          <div className="Edit__profile">
            <Link
              to={`/app/clients/detail/${
                props.clientDetail.payload.Id
              }/summary/edit`}
              className="Edit__profile pt-button pt-icon-edit"
            >
              Edit Profile
            </Link>
          </div>
          <table className="default-table-shaded">
            <tbody>
              <tr>
                <td className="label">Primary Phone:</td>
                <td className="value">
                  {props.clientDetail.payload.PrimaryPhone}
                </td>
              </tr>
              <tr>
                <td className="label">Secondary Phone:</td>
                <td className="value">
                  {props.clientDetail.payload.SecondaryPhone}
                </td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td className="value">{props.clientDetail.payload.Email}</td>
              </tr>
              <tr>
                <td className="label">Website:</td>
                <td className="value">{props.clientDetail.payload.Url}</td>
              </tr>
              <tr>
                <td className="label">Fax:</td>
                <td className="value">{props.clientDetail.payload.Fax}</td>
              </tr>
              <tr>
                <td className="label">Tax Id:</td>
                <td className="value">{props.clientDetail.payload.TaxId}</td>
              </tr>
              <tr>
                <td className="label">Duns Number:</td>
                <td className="value">{props.clientDetail.payload.Duns}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCard;
