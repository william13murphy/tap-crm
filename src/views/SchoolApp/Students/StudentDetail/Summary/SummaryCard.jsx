import AvatarBlank from 'assets/images/avatar_blank.png';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import connect from 'src/redux/connect';
import './styles.less';




class SummaryCard extends React.PureComponent {

    render() {

        const user = this.props.studentDetail.payload.User;
        const studentDetail = this.props.studentDetail.payload;
        const profilePicture = user.Profile.PictureBlobUrl || AvatarBlank;
        const fullName = user.Profile.FirstName + ' ' + user.Profile.LastName;
    
    
        return (
            <div className='CompactSummaryCard'>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
                    <h5 style={{width: '100%', display: 'flex', justifyContent: 'flex-end', color: 'lightgray'}}>{this.props.studentDetail.payload.BarCode}</h5>
                    <img style={{height: '160px', width: '160px', borderRadius: '80px',  objectFit: 'cover', margin: '20px'   }} className="ProfileCard__picture" src={profilePicture} />
                    <h2>{`${fullName} (${user.Profile.PrefferedName || user.Profile.FirstName})`}</h2>
                    <div style={{display: 'flex', flexDirection: 'row'}}><p style={{marginRight: '4px'}}>{`${moment().diff(user.Profile.Dob, 'years')} Years,`}</p>
                    <ReferenceOutput
                        listName="LstGenders"
                        id={user.Profile.GenderId} /></div>
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
                    >{user.Email}</Link>
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
                </div>
            </div>

        );


    }


};

const mapStateToProps = state => {
  return {
    contacts: state.student.contacts,
    studentDetail: state.student.detail,
    token: state.token,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  SummaryCard,
  mapStateToProps
);
