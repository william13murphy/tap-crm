import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import ProfileCard from 'components/ProfileCard';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import { Route, Link } from 'react-router-dom';
import Modal from 'components/Modal';
import EditStaffForm from './EditStaffForm';
import UpdateUserProfileFormContainer from 'containers/Administration/UpdateUserProfileFormContainer';
import EditStaffPictureForm from './EditStaffPictureForm';
import UserMeContainer from 'containers/User/UserMeContainer';
import AvatarBlank from 'assets/images/avatar_blank.png';
import './styles.less';

type AdminStaffProfileCardProps = {
  user: {
    payload: {
      User: {
        Profile: {
          PictureHeader: string,
          Picture: string,
        },
      },
    },
  },
};

class AdminStaffProfileCard extends React.Component {
  props: AdminStaffProfileCardProps;
  render() {
    const user = this.props.user.payload;

    const profilePicture = user.Profile.PictureBlobUrl || AvatarBlank;
    return (
      <ProfileCard className="StaffProfileCard">
        <div className="ProfileCard__header">
          <h1>
            {user.Profile.Prefix || ''}
            &nbsp;
            {user.Profile.FirstName}
            &nbsp;
            {user.Profile.LastName}
            &nbsp;
            {user.Profile.Suffix || ''}
          </h1>
        </div>
        <Route
          path={`${this.props.match.path}/edit-picture`}
          render={() => (
            <Modal title="Edit Staff Picture" closeUrl={this.props.match.url}>
              <UpdateUserProfileFormContainer
                dispatchActionOnCloseParams={this.props.user.payload.Id}
                redirectOnSuccess={this.props.match.url}
              >
                <EditStaffPictureForm initialValues={this.props.user.payload} />
              </UpdateUserProfileFormContainer>
            </Modal>
          )}
        />
        <Route
          path={`${this.props.match.path}/edit-profile`}
          render={() => (
            <Modal
              title="Edit EFC Staff Profile"
              closeUrl={this.props.match.url}
            >
              <UpdateUserProfileFormContainer
                dispatchActionOnCloseParams={this.props.user.payload.Id}
                redirectOnSuccess={this.props.match.url}
              >
                <EditStaffForm initialValues={this.props.user.payload} />
              </UpdateUserProfileFormContainer>
            </Modal>
          )}
        />
        <div className="one-third-two-third">
          <div className="one-third">
            <div className="ProfileCard__picture__container">
              <img className="ProfileCard__picture" src={profilePicture} />
              <Link to={`${this.props.match.url}/edit-picture`}>
                <button className="ProfileCard__picture__edit pt-button pt-icon-style" />
              </Link>
            </div>
            <div>
              <Link
                className="EditLink"
                to={`${this.props.match.url}/edit-profile`}
              >
                <button className="pt-button">
                  <i className="fa fa-pencil" />
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="two-third">
            <table>
              <tbody>
                <tr>
                  <td className="label">Preferred Name:</td>
                  <td className="value">
                    {user.Profile.PrefferedName || user.Profile.FirstName}
                  </td>
                </tr>
                <tr>
                  <td className="label">Title:</td>
                  <td className="value">{user.Profile.Title}</td>
                </tr>
                <tr>
                  <td className="label">Date of Birth:</td>
                  <td className="value">
                    {moment(user.Profile.Dob).format('MMMM D, YYYY')}
                  </td>
                </tr>
                <tr>
                  <td className="label">Gender:</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstGenders"
                      id={user.Profile.GenderId}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Phone Number:</td>
                  <td className="value">{user.PhoneNumber}</td>
                </tr>
                <tr>
                  <td className="label">Email:</td>
                  <td className="value">{user.Email}</td>
                </tr>
                <tr>
                  <td className="label">User Type:</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstUserTypes"
                      id={user.Profile.UserTypeId}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ProfileCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.administration.user,
    token: state.token.payload,
  };
};

export default connect(
  AdminStaffProfileCard,
  mapStateToProps
);
