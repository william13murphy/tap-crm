import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import AvatarBlank from 'assets/images/avatar_blank.png';

import LogOutButtonWrapper from 'components/Auth/LogOutButtonWrapper';
import ProfileCard from 'components/ProfileCard';
import Modal from 'components/Modal';

import UpdateEmailFormContainer from 'containers/Utility/UpdateEmailFormContainer';
import UpdatePasswordFormContainer from 'containers/Utility/UpdatePasswordFormContainer';
import UpdatePasswordForm from '../UpdatePasswordForm';
import UpdateEmailForm from '../UpdateEmailForm';
import './styles.less';

type UserAccountCardProps = {
  user: {
    payload: {
      Profile: {
        PictureHeader: string,
        Picture: string,
      },
    },
  },
  userId: string,
};

const ACCOUNT_SETTINGS_PATH = '/app/user/account';
const UPDATE_EMAIL_FORM_PATH = '/app/user/account/updateEmail';
const UPDATE_PASSWORD_FORM_PATH = '/app/user/account/updatePassword';

class UserAccountCard extends React.Component {
  props: UserAccountCardProps;
  render() {
    const user = this.props.user.payload;
    const profilePicture = user.Profile.PictureBlobUrl || AvatarBlank;
    return (
      <ProfileCard className="UserAccountCard">
        <Route
          path={UPDATE_EMAIL_FORM_PATH}
          render={() => (
            <Modal
              title="Update Email Address"
              closeUrl={ACCOUNT_SETTINGS_PATH}
            >
              <UpdateEmailFormContainer
                dispatchActionOnCloseParams={this.props.userId}
                redirectOnSuccess={ACCOUNT_SETTINGS_PATH}
              >
                <UpdateEmailForm
                  initialValues={{ id: user.Id, email: user.Email }}
                />
              </UpdateEmailFormContainer>
            </Modal>
          )}
        />
        <Route
          path={UPDATE_PASSWORD_FORM_PATH}
          render={() => (
            <Modal title="Update Password" closeUrl={ACCOUNT_SETTINGS_PATH}>
              <UpdatePasswordFormContainer
                dispatchActionOnCloseParams={this.props.userId}
                redirectOnSuccess={ACCOUNT_SETTINGS_PATH}
              >
                <UpdatePasswordForm initialValues={{ id: user.Id }} />
              </UpdatePasswordFormContainer>
            </Modal>
          )}
        />
        <div>
          <div className="main">
            <img className="ProfileCard__picture" src={profilePicture} />
            <div className="ProfileCard__name">
              {user.Profile.Prefix || ''}
              {user.Profile.FirstName}
              {user.Profile.LastName}
              {user.Profile.Suffix || ''}
            </div>
            <div className="ProfileCard__title">{user.Profile.Title}</div>
            <div className="ProfileCard__title">{user.Email}</div>
          </div>
          <div className="ProfileCard__actions">
              <LogOutButtonWrapper>
                <button className="pt-button pt-icon-log-out">Log out</button>
              </LogOutButtonWrapper>
              <Link to={UPDATE_EMAIL_FORM_PATH}>
                <button className="pt-button">Edit Email</button>
              </Link>
              <Link to={UPDATE_PASSWORD_FORM_PATH}>
                <button className="pt-button">Change Password</button>
              </Link>
            </div>
        </div>
      </ProfileCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.me,
    userId: state.token.payload.UserId,
  };
};

export default connect(
  UserAccountCard,
  mapStateToProps
);
