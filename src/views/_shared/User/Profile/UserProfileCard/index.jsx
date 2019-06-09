import React from 'react';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';
import LogOutButtonWrapper from 'components/Auth/LogOutButtonWrapper';
import ProfileCard from 'components/ProfileCard';

import UpdateMyUserFormContainer from 'containers/User/UpdateMyUserFormContainer';
import UpdateUserProfileForm from '../UpdateUserProfileForm';
import EditUserProfilePictureForm from '../EditUserProfilePictureForm';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';

type UserProfileCardProps = {
  match: {
    url: string,
  },
  userMe: {
    payload: {
      Profile: {
        PictureHeader: string,
        Picture: string,
      },
    },
  },
  token: {
    payload: {
      FirstLogin: boolean,
      UserId: string,
    },
  },
};

const MY_PROFILE_PATH = '/app/user/profile';
const UPDATE_USER_PROFILE_FORM_PATH = '/app/user/profile/edit';

class UserProfileCard extends React.Component {
  props: UserProfileCardProps;
  render() {
    const userMe = this.props.userMe.payload;
    const profilePicture =
      this.props.userMe.payload.Profile.PictureBlobUrl || AvatarBlank;
    return (
      <ProfileCard className="UserProfileCard">
        <Route
          path={UPDATE_USER_PROFILE_FORM_PATH}
          render={() => (
            <Modal
              title={
                this.props.token.payload.FirstLogin === 'True'
                  ? 'Setup Your Profile'
                  : 'Update My Profile'
              }
              closeUrl={MY_PROFILE_PATH}
            >
              <UpdateMyUserFormContainer
                dispatchActionOnCloseParams={this.props.token.payload.UserId}
                redirectOnSuccess={MY_PROFILE_PATH}
              >
                <UpdateUserProfileForm
                  initialValues={this.props.userMe.payload}
                />
              </UpdateMyUserFormContainer>
            </Modal>
          )}
        />
        <Route
          exact
          path={`/app/user/profile/edit-picture`}
          render={() => (
            <Modal title="Edit User Picture" closeUrl={MY_PROFILE_PATH}>
              <UpdateMyUserFormContainer
                dispatchActionOnCloseParams={this.props.token.payload.UserId}
                redirectOnSuccess={MY_PROFILE_PATH}
              >
                <EditUserProfilePictureForm
                  initialValues={{ id: userMe.Id, ...userMe }}
                />
              </UpdateMyUserFormContainer>
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
          </div>

          <div className="two-third">
            <table className="default-table-shaded">
              <tbody>
                <tr>
                  <td className="label">Preferred Name:</td>
                  <td className="value">
                    {userMe.Profile.PrefferedName || userMe.Profile.FirstName}
                  </td>
                </tr>
                <tr>
                  <td className="label">Date of Birth:</td>
                  <td className="value">
                    {moment(userMe.Profile.Dob).format('MMMM D, YYYY')}
                  </td>
                </tr>
                <tr>
                  <td className="label">Gender:</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstGenders"
                      id={userMe.Profile.GenderId}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Phone Number:</td>
                  <td className="value">{userMe.PhoneNumber}</td>
                </tr>
                <tr>
                  <td className="label">Email:</td>
                  <td className="value">{userMe.Email}</td>
                </tr>
                <tr>
                  <td className="label">User Type:</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstUserTypes"
                      id={userMe.Profile.UserTypeId}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="ProfileCard__actions">
              <Link
                className="pt-button pt-icon-edit"
                to={UPDATE_USER_PROFILE_FORM_PATH}
              >
                Edit Profile
              </Link>
              <LogOutButtonWrapper>
                <button className="pt-button pt-icon-log-out">Log out</button>
              </LogOutButtonWrapper>
            </div>
        </div>
          </div>
      </ProfileCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    userMe: state.user.me,
    token: state.token,
  };
};

export default connect(
  UserProfileCard,
  mapStateToProps
);
