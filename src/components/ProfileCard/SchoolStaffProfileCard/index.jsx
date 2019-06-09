import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import ProfileCard from 'components/ProfileCard';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import { Route, Link } from 'react-router-dom';
import Modal from 'components/Modal';
import EditStaffForm from './EditStaffForm';
import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import EditStaffPictureForm from './EditStaffPictureForm';
import { schoolContactFetch } from 'src/redux/actionCreators/school/contact';
import UserMeContainer from 'containers/User/UserMeContainer';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';

type SchoolStaffProfileCardProps = {
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
  token: {
    SchoolId: string,
  },
  dispatchSchoolStaffDetailFetch: Function,
};

class SchoolStaffProfileCard extends React.Component {
  props: SchoolStaffProfileCardProps;
  render() {
    const user = this.props.user.payload;
    const schoolId = this.props.match.params.schoolId;

    if (user && user.User) {
      const profilePicture = user.User.Profile.PictureBlobUrl || AvatarBlank;
      return (
        <ProfileCard className="StaffProfileCard">
          <div className="ProfileCard__header">
            <h1>
              {user.User.Profile.Prefix || ''}
              &nbsp;
              {user.User.Profile.FirstName}
              &nbsp;
              {user.User.Profile.LastName}
              &nbsp;
              {user.User.Profile.Suffix || ''}
            </h1>
          </div>
          <Route
            path={`${this.props.match.path}/edit-picture`}
            render={() => (
              <Modal title="Edit Staff Picture" closeUrl={this.props.match.url}>
                <UserMeContainer>
                  <SchoolContactFormContainer
                    dispatchActionOnClose={
                      this.props.dispatchSchoolStaffDetailFetch
                    }
                    dispatchActionOnCloseParams={this.props.user.payload.Id}
                    redirectOnSuccess={`/app/school-app/${schoolId}/school-detail/staff/detail/${
                      this.props.user.payload.Id
                    }`}
                  >
                    <EditStaffPictureForm
                      initialValues={this.props.user.payload}
                    />
                  </SchoolContactFormContainer>
                </UserMeContainer>
              </Modal>
            )}
          />
          <Route
            path={`/app/school-app/${schoolId}/school-detail/staff/detail/${
              this.props.user.payload.Id
            }/edit-profile`}
            render={() => (
              <Modal
                title="Edit School Staff Profile"
                closeUrl={`/app/school-app/${schoolId}/school-detail/staff/detail/${
                  this.props.user.payload.Id
                }`}
              >
                <SchoolContactFormContainer
                  dispatchActionOnClose={
                    this.props.dispatchSchoolStaffDetailFetch
                  }
                  dispatchActionOnCloseParams={this.props.user.payload.Id}
                  redirectOnSuccess={`/app/school-app/${schoolId}/school-detail/staff/detail/${
                    this.props.user.payload.Id
                  }`}
                >
                  <EditStaffForm
                    schoolId={schoolId}
                    initialValues={this.props.user.payload}
                  />
                </SchoolContactFormContainer>
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
                  to={`/app/school-app/${schoolId}/school-detail/staff/detail/${
                    this.props.user.payload.Id
                  }/edit-profile`}
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
                      {user.User.Profile.PrefferedName ||
                        user.User.Profile.FirstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Title:</td>
                    <td className="value">{user.User.Profile.Title}</td>
                  </tr>
                  <tr>
                    <td className="label">Date of Birth:</td>
                    <td className="value">
                      {moment(user.User.Profile.Dob).format('MMMM D, YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Gender:</td>
                    <td className="value">
                      <ReferenceOutput
                        listName="LstGenders"
                        id={user.User.Profile.GenderId}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Phone Number:</td>
                    <td className="value">{user.User.PhoneNumber}</td>
                  </tr>
                  <tr>
                    <td className="label">Email:</td>
                    <td className="value">{user.User.Email}</td>
                  </tr>
                  <tr>
                    <td className="label">User Type:</td>
                    <td className="value">
                      <ReferenceOutput
                        listName="LstUserTypes"
                        id={user.User.Profile.UserTypeId}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ProfileCard>
      );
    } else {
      return <div>No user data found.</div>;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSchoolStaffDetailFetch: staffId => {
      dispatch(schoolContactFetch(staffId));
    },
  };
};

const mapStateToProps = state => {
  return {
    userAdmin: state.administration,
    token: state.token.payload,
    user: state.school.contact,
  };
};

export default connect(
  SchoolStaffProfileCard,
  mapStateToProps,
  mapDispatchToProps
);
