import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import BackButton from 'components/Buttons/BackButton';

import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import DataCard from 'components/DataCard';
import './styles.less';

import {
  getTimeZoneLabel,
  localMoment,
  getMomentLocalDateTime,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'src/util/localization/timezone';

type AppointmentDetailPageProps = {
  utilityStaffs: {
    payload: [],
  },
  utilityStudents: {
    payload: [],
  },
  timeZone: string,
  backUrl: string,
  data: Object,

  appointmentDetail: {
    payload: any,
  },
  match: {
    params: {
      appointmentId: string,
      schoolId: string,
    },
  },
};
class AppointmentDetailPage extends React.Component {
  constructor(props: AppointmentDetailPageProps) {
    super(props);
    this.state = {
      timeZone: '',
    };
  }

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  getAppointmentStaffs() {
    let appointmentDetail = this.props.appointmentDetail.payload;

    return this.props.utilityStaffs.payload.filter(item => {
      let matchedItem =
        appointmentDetail.AppointmentMembers &&
        appointmentDetail.AppointmentMembers.find(
          member => member.UserId === item.UserId
        );
      if (matchedItem) return true;
    });
  }

  getAppointmentStudents() {
    let appointmentDetail = this.props.appointmentDetail.payload;

    return this.props.utilityStudents.payload.filter(item => {
      let matchedItem =
        appointmentDetail.AppointmentMembers &&
        appointmentDetail.AppointmentMembers.find(
          member => member.UserId === item.UserId
        );
      if (matchedItem) return true;
    });
  }

  render() {
    let staffs = [];
    let students = [];

    if (this.props.appointmentDetail && this.props.appointmentDetail.payload) {
      let appointmentDetail = this.props.appointmentDetail.payload;

      if (appointmentDetail.AppointmentMembers) {
        staffs = this.getAppointmentStaffs();
        students = this.getAppointmentStudents();
      }

      let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        appointmentDetail.StartDate,
        appointmentDetail.StartTimeUtc
      );

      let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        appointmentDetail.EndDate,
        appointmentDetail.EndTimeUtc
      );

      let startTime = startDateTime.format('h:mm a');

      let endTime = endDateTime.format('h:mm a');

      const schoolId = this.props.match.params.schoolId;

      return (
        <Page className="AppointmentDetailPage" title="Appointment Detail">
          <PageHeader>
            <PageTitle paddingNone>
              {appointmentDetail && appointmentDetail.Title}
            </PageTitle>
          </PageHeader>
          <PageBody>
            <DataCard title="Appointment Details">
              {appointmentDetail &&
                startDateTime.isSameOrAfter(
                  localMoment(this.state.schoolTimeZone).startOf('day')
                ) && (
                  <Link
                    className="EditAppointmentLink"
                    to={`/app/school-app/${schoolId}/dashboard/calendar/appointments/${
                      appointmentDetail.Id
                    }/detail/edit`}
                  >
                    <button className="pt-button pt-intent-primary">
                      Edit Appointment
                    </button>
                  </Link>
                )}
              <table className="default-table-plain">
                <tbody>
                  <tr>
                    <td>
                      <strong>Appointment Type</strong>
                    </td>
                    <td>
                      <ReferenceOutput
                        listName="LstAppointmentTypes"
                        id={appointmentDetail.AppointmentTypeId}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description:</strong>
                    </td>
                    <td>{appointmentDetail.Description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date:</strong>
                    </td>
                    <td>{startDateTime.format('MMMM Do YYYY')}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Time:</strong>
                    </td>
                    <td>
                      {startTime} &ndash; {endTime}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Staff Members:</strong>
                    </td>
                    <td>
                      {staffs.map((item, index) => {
                        let contactDetail = this.props.schoolContacts.find(
                          item1 => item1.UserId === item.UserId
                        );
                        return (
                          <Link
                            key={item.UserId}
                            to={`/app/school-app/${schoolId}/school-detail/staff/detail/${
                              contactDetail.Id
                            }`}
                          >
                            {item.Name}
                            {index < staffs.length - 1 && ', '}
                          </Link>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Student Members:</strong>
                    </td>
                    <td>
                      {students.map((item, index) => {
                        return (
                          <span key={item.UserId}>
                            <Link
                              to={`/app/school-app/${schoolId}/students/detail/${
                                item.StudentId
                              }/summary`}
                            >
                              {item.Name}
                            </Link>
                            {index < students.length - 1 && ', '}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </DataCard>
          </PageBody>
        </Page>
      );
    } else {
      return <div>No appointment found</div>;
    }
  }
}

const mapStateToProps = function(state) {
  return {
    utilityStudents: state.school.utilityStudents,
    utilityStaffs: state.school.utilityStaffs,
    schoolContacts: state.school.contacts.payload,
    appointmentDetail: state.user.appointmentDetail,
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

export default connect(
  AppointmentDetailPage,
  mapStateToProps
);
