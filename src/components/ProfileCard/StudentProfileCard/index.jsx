import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import ProfileCard from 'components/ProfileCard';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import { userFullName } from 'util/user';
import { Route, Link } from 'react-router-dom';
import Modal from 'components/Modal';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';

import StudentFormContainer from 'containers/Student/StudentFormContainer';
import EditStudentPictureForm from './EditStudentPictureForm';

import StudentWaiverGenerateManyContainer from 'containers/Student/StudentWaiverGenerateManyContainer';
import StudentWaiverDisplay from './StudentWaiverDisplay';

import StudentWaiverFormContainer from 'containers/Student/StudentWaiverFormContainer';
import StudentWaiverSignatureForm from './StudentWaiverSignatureForm';

type StudentProfileCardProps = {
  match: {
    url: string,
  },
  studentDetail: {
    payload: {
      User: {
        Profile: {
          PictureHeader: string,
          Picture: string,
        },
      },
      BarCode: string,
      Id: string,
    },
  },
};

class StudentProfileCard extends React.Component {
  props: StudentProfileCardProps;
  render() {
    const user = this.props.studentDetail.payload.User;
    const studentDetail = this.props.studentDetail.payload;
    const profilePicture = user.Profile.PictureBlobUrl || AvatarBlank;
    const fullName = user.Profile.FirstName + ' ' + user.Profile.LastName;
    return (
      <ProfileCard
        className="StudentProfileCard"
        title="Student Profile"
        subTitle={this.props.studentDetail.payload.BarCode}
      >
        <Route
          path={`${this.props.match.path}/edit-picture`}
          render={() => (
            <Modal title="Edit Student Picture" closeUrl={this.props.match.url}>
              <StudentFormContainer
                update
                redirectOnSuccess={`/app/school-app/${
                  this.props.schoolId
                }/students/detail/${
                  this.props.studentDetail.payload.Id
                }/summary`}
                dispatchActionOnCloseParams={
                  this.props.studentDetail.payload.Id
                }
              >
                <EditStudentPictureForm
                  initialValues={this.props.studentDetail.payload}
                />
              </StudentFormContainer>
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
            <div className="Profile__actions">
              <Link
                className="EditLink"
                to={`${this.props.match.url}/profile/edit`}
              >
                <button className="pt-button">
                  <i className="fa fa-pencil" />
                  Edit Profile
                </button>
              </Link>

              {studentDetail.WaiverBlobUrl ? (
                <a
                  href={studentDetail.WaiverBlobUrl}
                  className="StudentWaiver ViewWaiver__button pt-button float-right"
                >
                  View Waiver
                </a>
              ) : (
                <Link
                  to={`${this.props.match.url}/sign-waiver/${studentDetail.Id}`}
                  className="StudentWaiver ViewWaiver__button pt-button float-right pt-intent-danger"
                >
                  Sign Waiver
                </Link>
              )}
            </div>
            <Route
              path={`${this.props.match.path}/sign-waiver/${studentDetail.Id}`}
              render={routeProps => (
                <Modal
                  className="Modal__ViewStudentWaiverForm"
                  title={`Sign Waiver for ${fullName}`}
                  closeUrl={this.props.match.url}
                >
                  <StudentWaiverGenerateManyContainer
                    dispatchFetchParams={studentDetail.Id}
                  >
                    <StudentWaiverDisplay studentId={studentDetail.Id} />
                  </StudentWaiverGenerateManyContainer>
                  <StudentWaiverFormContainer
                    dispatchActionOnCloseParams={studentDetail.Id}
                    redirectOnSuccess={this.props.match.url}
                  >
                    <StudentWaiverSignatureForm studentId={studentDetail.Id} />
                  </StudentWaiverFormContainer>
                </Modal>
              )}
            />
          </div>
          <div className="two-third">
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td className="label">Full Name</td>
                  <td className="value">{userFullName(user)}</td>
                </tr>
                <tr>
                  <td className="label">Preferred Name</td>
                  <td className="value">
                    {user.Profile.PrefferedName || user.Profile.FirstName}
                  </td>
                </tr>
                <tr>
                  <td className="label">Age</td>
                  <td className="value">
                    {moment().diff(user.Profile.Dob, 'years')}
                  </td>
                </tr>
                <tr>
                  <td className="label">Date of Birth</td>
                  <td className="value">
                    {moment(user.Profile.Dob).format('MMMM D, YYYY')}
                  </td>
                </tr>
                <tr>
                  <td className="label">Gender</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstGenders"
                      id={user.Profile.GenderId}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Phone Number</td>
                  <td className="value" title="Send a SMS">
                    <Link
                      to={{
                        pathname: `/app/school-app/${
                          this.props.schoolId
                        }/students/detail/${studentDetail.Id}/summary/send-sms`,
                        state: {
                          studentId: studentDetail.Id,
                          schoolId: this.props.schoolId,
                          firstName: user.Profile.FirstName,
                          lastName: user.Profile.LastName,
                          prevPath: location.pathname,
                        },
                      }}
                    >
                      {user.PhoneNumber}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="label">Email</td>
                  <td className="value" title="Send an Email">
                    <Link
                      to={{
                        pathname: `/app/school-app/${
                          this.props.schoolId
                        }/students/detail/${
                          studentDetail.Id
                        }/summary/send-email`,
                        state: {
                          studentId: studentDetail.Id,
                          schoolId: this.props.schoolId,
                          firstName: user.Profile.FirstName,
                          lastName: user.Profile.LastName,
                          prevPath: location.pathname,
                        },
                      }}
                    >
                      {user.Email}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="label">Source</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstMarketingTypes"
                      id={this.props.studentDetail.payload.MarketingTypeId}
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
    studentDetail: state.student.detail,
  };
};

export default connect(
  StudentProfileCard,
  mapStateToProps
);
