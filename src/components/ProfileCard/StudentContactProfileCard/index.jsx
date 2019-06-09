import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import ProfileCard from 'components/ProfileCard';
import { userFullName } from 'util/user';
import { Route, Link } from 'react-router-dom';
import Modal from 'components/Modal';
import './styles.less';
import AvatarBlank from 'assets/images/avatar_blank.png';

import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import StudentContactFormContainer from 'containers/Student/StudentContactFormContainer';

type StudentContactProfileCardProps = {
  match: { params: { schoolId: string } },
  contactDetail: {
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

class StudentContactProfileCard extends React.Component {
  props: StudentContactProfileCardProps;
  render() {
    const user = this.props.contactDetail.payload.User;
    const schoolId = this.props.match.params.schoolId;

    const profilePicture =
      user.Profile.PictureHeader + user.Profile.Picture || AvatarBlank;
    return (
      <div className="StudentContactProfileCard">
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
            <div className="ProfileCard__picture__container">
              <img className="ProfileCard__picture" src={profilePicture} />
            </div>
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
                  <td className="value">{user.PhoneNumber}</td>
                </tr>
                <tr>
                  <td className="label">Email</td>
                  <td className="value">
                    <a>{user.Email}</a>
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

const mapStateToProps = state => {
  return {
    contactDetail: state.student.contactDetail,
  };
};

export default connect(
  StudentContactProfileCard,
  mapStateToProps
);
