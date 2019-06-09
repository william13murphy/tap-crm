import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import ProfileCard from 'components/ProfileCard';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';

type UserProfileCardProps = {
  user: {
    payload: {
      Profile: {
        PictureBlobUrl: string,
      },
    },
  },
};

class ExternalUserProfileCard extends React.Component {
  props: UserProfileCardProps;
  render() {
    const user = this.props.user.payload;
    return (
      <ProfileCard className="ExternalUserProfileCard">
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
        <div className="one-third-two-third">
          <div className="one-third">
            <img
              className="ProfileCard__picture"
              src={this.props.user.payload.Profile.PictureBlobUrl}
            />
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
  };
};

export default connect(
  ExternalUserProfileCard,
  mapStateToProps
);
