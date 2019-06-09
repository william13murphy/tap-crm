import React from 'react';
import moment from 'moment';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';

type UserProfileCardProps = {
  user: {
    Administrator: boolean,
    Preffered: boolean,
    User: {
      Profile: {
        PictureHeader: string,
        Picture: string,
      },
    },
  },
};

class EfcContactUserProfile extends React.Component {
  props: UserProfileCardProps;
  render() {
    const user = this.props.user.User;
    const profilePicture = user.Profile.PictureBlobUrl || AvatarBlank;
    return (
      <div className="SchoolContactUserProfile">
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
            <img className="ProfileCard__picture" src={profilePicture} />
          </div>
          <div className="two-third">
            <table className="default-table-plain">
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
                  <td className="label">Gender:</td>
                  <td className="value">
                    <ReferenceOutput
                      id={user.Profile.GenderId}
                      listName="LstGenders"
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
                  <td className="label">Date of Birth:</td>
                  <td className="value">
                    {moment(user.Profile.Dob).format('MMMM D, YYYY')}
                  </td>
                </tr>
                <tr>
                  <td className="label">User Type:</td>
                  <td className="value">
                    <ReferenceOutput
                      id={user.Profile.UserTypeId}
                      listName="LstUserTypes"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Preferred Contact:</td>
                  <td className="value">
                    {this.props.user.Preffered ? 'Yes' : 'No'}
                  </td>
                </tr>
                <tr>
                  <td className="label">Admin:</td>
                  <td className="value">
                    {this.props.user.Administrator ? 'Yes' : 'No'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EfcContactUserProfile;
