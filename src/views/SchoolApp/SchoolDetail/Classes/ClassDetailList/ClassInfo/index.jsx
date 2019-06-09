import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import moment from 'moment';

import SchoolUtilityStaffContainer from 'src/containers/School/SchoolUtilityStaffsContainer';
import StaffNameOutput from 'src/components/ConnectedComponents/StaffNameOutput';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'util/localization/timezone';
import './styles.less';

type ClassInfoProps = {
  schoolClassDetail: {
    payload: {},
  },
};

class ClassInfo extends React.Component {
  props: ClassDetailsProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({ schoolTimeZone });
  }

  getStartDateTime = () => {
    let localDateTime = calculateLocalDateTimeFromUTCDateAndTime(
      this.state.schoolTimeZone,
      this.props.schoolClassDetail.payload.StartDate,
      this.props.schoolClassDetail.payload.StartTimeUtc
    );
    return localDateTime;
  };

  getEndDateTime = () => {
    let localDateTime = calculateLocalDateTimeFromUTCDateAndTime(
      this.state.schoolTimeZone,
      this.props.schoolClassDetail.payload.StartDate,
      this.props.schoolClassDetail.payload.EndTimeUtc
    );
    return localDateTime;
  };

  render() {
    return (
      <div className="ClassInfo pt-card">
        <Link
          to={{
            pathname: `/app/school-app/${
              this.props.schoolClassDetail.payload.SchoolId
            }/school-detail/classes/class-detail/${
              this.props.schoolClassDetail.payload.Id
            }/edit-class`,
          }}
        >
          <button
            className="ClassInfo__edit pt-button pt-intent-primary pt-icon-edit"
            aria-hidden="true"
          >
            Edit Class
          </button>
        </Link>
        <table className="default-table-plain">
          <tbody>
            <tr>
              <td>Instructor:</td>
              <td>
                {this.props.schoolClassDetail.payload.Instructor ? (
                  <SchoolUtilityStaffContainer
                    dispatchFetchParams={
                      this.props.schoolClassDetail.payload.SchoolId
                    }
                  >
                    {this.props.utilityStaffs.payload && (
                      <Link
                        to={`/app/school-app/${
                          this.props.schoolClassDetail.payload.SchoolId
                        }/school-detail/staff/detail/${
                          this.props.utilityStaffs.payload.find(
                            item =>
                              item.UserId ===
                              this.props.schoolClassDetail.payload.Instructor
                          ).SchoolContactId
                        }`}
                      >
                        <StaffNameOutput
                          id={this.props.schoolClassDetail.payload.Instructor}
                        />
                      </Link>
                    )}
                  </SchoolUtilityStaffContainer>
                ) : (
                  <span>No instructor found.</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Program:</td>
              <td>
                <Link
                  to={`/app/school-app/${
                    this.props.schoolClassDetail.payload.SchoolId
                  }/school-detail/programs/detail/${
                    this.props.schoolClassDetail.payload.SchoolStyleId
                  }/program`}
                >
                  {this.props.styles.payload.map((cV, i) => {
                    if (
                      cV.Id ===
                      this.props.schoolClassDetail.payload.SchoolStyleId
                    ) {
                      return <span key={i}>{cV.Name}</span>;
                    }
                  })}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Max Students:</td>
              <td>{this.props.schoolClassDetail.payload.MaximumStudents}</td>
            </tr>
          </tbody>
        </table>
        <table className="default-table-plain">
          <tbody>
            <tr>
              <td>Start Date:</td>
              <td>{this.getStartDateTime().format('MMMM Do, YYYY')}</td>
            </tr>
            <tr>
              <td>End Date:</td>
              <td>
                {moment(this.props.schoolClassDetail.payload.EndDate).isBefore(
                  '9999-12-31T00:00:00',
                  'year'
                )
                  ? moment(this.props.schoolClassDetail.payload.EndDate).format(
                      'MMMM Do, YYYY'
                    )
                  : ''}
              </td>
            </tr>
            <tr>
              <td>Time Start:</td>
              <td>{this.getStartDateTime().format('h:mm a')}</td>
            </tr>
            <tr>
              <td>Time End:</td>
              <td>{this.getEndDateTime().format('h:mm a')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    styles: state.school.styles,
    schoolClassDetail: state.school.classDetail,
    utilityStaffs: state.school.utilityStaffs,
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  ClassInfo,
  mapStateToProps
);
