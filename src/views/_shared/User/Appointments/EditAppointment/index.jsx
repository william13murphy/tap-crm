import React from 'react';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import UserAppointmentFormContainer from 'containers/User/UserAppointmentFormContainer';
import AppointmentForm from '../AppointmentForm';

import {
  getTimeZoneLabel,
  getMomentLocalDateTime,
  convertMomentToCleanDate,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'src/util/localization/timezone';

type EditAppointmentSectionProps = {
  match: { params: { schoolId: string } },
  appointmentDetail: {
    payload: any,
  },
  utilityStaffs: {
    payload: [],
  },
  utilityStudents: {
    payload: [],
  },
};
class EditAppointment extends React.Component {
  props: EditAppointmentSectionProps;

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

  render() {
    const schoolId = this.props.match.params.schoolId;

    let appointmentDetail = this.props.appointmentDetail.payload;

    let StartTimeUtc, EndTimeUtc, staffs, students;

    if (appointmentDetail) {
      staffs = this.props.utilityStaffs.payload.filter(item => {
        let matchedItem =
          appointmentDetail.AppointmentMembers &&
          appointmentDetail.AppointmentMembers.find(
            member => member.UserId === item.UserId
          );
        if (matchedItem) return true;
      });

      students = this.props.utilityStudents.payload.filter(item => {
        let matchedItem =
          appointmentDetail.AppointmentMembers &&
          appointmentDetail.AppointmentMembers.find(
            member => member.UserId === item.UserId
          );
        if (matchedItem) return true;
      });

      StartTimeUtc = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        appointmentDetail.StartDate,
        appointmentDetail.StartTimeUtc
      );

      EndTimeUtc = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        appointmentDetail.EndDate,
        appointmentDetail.EndTimeUtc
      );
    }

    return (
      <Modal
        title="Edit Appointment"
        closeUrl={`/app/school-app/${
          this.props.match.params.schoolId
        }/dashboard/calendar/appointments/${
          this.props.match.params.appointmentId
        }/detail`}
      >
        <UserAppointmentFormContainer
          update={true}
          initialValues={{
            ...this.props.appointmentDetail.payload,
            StartTimeUtc: StartTimeUtc,
            EndTimeUtc: EndTimeUtc,
            Staffs:
              staffs &&
              staffs.map(function(item) {
                return item.UserId;
              }),
            Students:
              students &&
              students.map(function(item) {
                return item.UserId;
              }),
          }}
          dispatchActionOnCloseParams={this.props.userId}
          redirectOnSuccess={`/app/school-app/${
            this.props.match.params.schoolId
          }/dashboard/calendar/appointments/${
            this.props.match.params.appointmentId
          }/detail`}
        >
          <AppointmentForm update={true} />
        </UserAppointmentFormContainer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    utilityStudents: state.school.utilityStudents,
    utilityStaffs: state.school.utilityStaffs,
    appointmentDetail: state.user.appointmentDetail,
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
}

export default connect(
  EditAppointment,
  mapStateToProps
);
