import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import styleVariables from 'styles/_variables';
import connect from 'src/redux/connect';

import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
  convertMomentToCleanDate,
} from 'src/util/localization/timezone';

import { myAppointmentsFetch } from 'src/redux/actionCreators/user/myAppointments';
import { schoolContactCalendarFetch } from 'src/redux/actionCreators/school/contactCalendar';
import { schoolInstructorsCalendarFetch } from 'src/redux/actionCreators/school/instructorsCalendar';
import EventDay from './EventDay';

BigCalendar.momentLocalizer(moment);

let startDate = new Date();
let endDate = new Date();

type CalendarOverviewPageProps = {
  instructorsCalendar: {
    payload: [],
    error: boolean,
  },
  appointments: {
    payload: [],
  },
  adminCalendar: {
    payload: [],
    error: boolean,
  },
  adminAppointments: {
    payload: [],
  },
  timeZone: string,
  showUserClass: boolean,
  showUserAppointment: boolean,
  instructors: [],
  token: {
    payload: {
      UserName: string,
      SchoolId: string,
      UserId: string,
      TimeZone: string,
    },
  },
  history: {
    push: any,
  },
  references: {},
  dispatchSchoolContactCalendarFetch: Function,
  dispatchSchoolInstructorsCalendarFetch: Function,
  dispatchAppointmentDetailFetch: Function,
  dispatchUserMyAppointmentsFetch: Function,
};

class CalendarOverviewPage extends React.Component {
  props: CalendarOverviewPageProps;

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

  mergeAndFormatDateTime = (date, time) => {
    let localMoment = calculateLocalDateTimeFromUTCDateAndTime(
      this.state.schoolTimeZone,
      date,
      time
    );

    // Remove client system time and convert to js object for calendar:
    let cleanDateTime = convertMomentToCleanDate(localMoment);

    return cleanDateTime;
  };

  // Sometimes the time comes back as 00:00, even though it should be 24:00
  addDayIfEndBeforeStart(startDateTime, endDateTime) {
    let finalEndDateTime = endDateTime;

    if (endDateTime.isBefore(startDateTime)) {
      finalEndDateTime = endDateTime.add(1, 'days');
    }

    return finalEndDateTime;
  }

  mapClassEvents(payload) {
    if (!payload) return [];
    return payload.map((item, index) => {
      // Merge Time & Date, account for local time, and convert to Javascript date object for Calendar:

      let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        item.Date,
        item.Start
      );

      let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        item.Date,
        item.End
      );

      // Add a day if the end time is before the start time. This can happen sometimes
      // because the time is stored independently of the date in the back end.
      endDateTime = this.addDayIfEndBeforeStart(startDateTime, endDateTime);

      let start = convertMomentToCleanDate(startDateTime);
      let end = convertMomentToCleanDate(endDateTime);

      if (item.Style) {
        let formattedObj = {
          title: item.Style,
          start: start,
          end: end,
          original: item,
          index: index,
          type: 'Class',
        };

        return formattedObj;
      }
    });
  }

  mapAppointmentEvents(payload) {
    if (!payload) return [];
    return payload.map((item, index) => {
      let start = this.mergeAndFormatDateTime(
        item.StartDate,
        item.StartTimeUtc
      );
      let end = this.mergeAndFormatDateTime(item.EndDate, item.EndTimeUtc);

      return {
        title: item.Title,
        start: start,
        end: end,
        original: item,
        type: 'Appointment',
      };
    });
  }

  mapStaffEvents(items) {
    return items.map(item => {
      let start = this.mergeAndFormatDateTime(item.Date, item.Start);
      let end = this.mergeAndFormatDateTime(item.Date, item.End);

      if (item.ClassId) {
        return {
          title: item.Style,
          start: start,
          end: end,
          original: item,
          type: 'Class',
        };
      }
      if (item.AppointmentId) {
        return {
          title: item.TaskName,
          start: start,
          end: end,
          original: item,
          type: 'Appointment',
        };
      }
    });
  }

  customEventPropGetter = eventProps => {
    return {
      style: {
        backgroundColor:
          eventProps.type === 'Class'
            ? styleVariables.olive_light
            : eventProps.type === 'Appointment'
            ? styleVariables.turquoise
            : styleVariables.blue10,
        color: styleVariables.black,
      },
    };
  };

  setEvents = () => {
    const anyInstructorsEnabled =
      this.props.instructors &&
      Object.values(this.props.instructors).some(item => {
        return item;
      });

    let events = [];
    if (
      !anyInstructorsEnabled &&
      this.props.showUserAppointment &&
      this.props.showUserClass
    ) {
      events = this.mapClassEvents(this.props.adminCalendar.payload).concat(
        this.mapAppointmentEvents(this.props.adminAppointments.payload)
      );
    }
    if (
      !anyInstructorsEnabled &&
      this.props.showUserAppointment &&
      !this.props.showUserClass
    ) {
      events = this.mapAppointmentEvents(this.props.adminAppointments.payload);
    }

    if (
      !anyInstructorsEnabled &&
      !this.props.showUserAppointment &&
      this.props.showUserClass
    ) {
      events = this.mapClassEvents(this.props.adminCalendar.payload);
    }

    if (
      anyInstructorsEnabled &&
      this.props.instructors &&
      this.props.instructorsCalendar.payload
    ) {
      for (let instructor in this.props.instructors) {
        let value = this.props.instructors[instructor];
        if (value) {
          let matched = this.props.instructorsCalendar.payload.find(item => {
            return item.UserId === instructor;
          });
          if (matched) {
            let data = this.mapStaffEvents(matched.item);
            events = events.concat(data);
          }
        }
      }
    }

    return events;
  };

  render() {
    const { events, schoolId } = this.props;

    return (
      <div className="CalendarOverviewPage" title="Calendar">
        <BigCalendar
          showMultiDayTimes={true}
          eventPropGetter={this.customEventPropGetter}
          onSelectSlot={slotInfo => {
            this.props.history.push({
              pathname: `/app/school-app/${schoolId}/dashboard/calendar/appointments/add`,
              state: {
                initialValues: {
                  StartTimeUtc: moment(slotInfo.slots[0]).toISOString(),
                  EndTimeUtc: moment(
                    slotInfo.slots[slotInfo.slots.length - 1]
                  ).toISOString(),
                  StartDate: moment(slotInfo.start).toISOString(),
                  EndDate: slotInfo.end,
                },
                backUrl: `/app/school-app/${schoolId}/dashboard/calendar`,
              },
            });
          }}
          selectable={true}
          events={this.setEvents()}
          defaultDate={startDate}
          defaultView="week"
          components={{
            event: EventDay,
            day: {
              event: EventDay,
            },
          }}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchUserMyAppointmentsFetch: id => {
      dispatch(myAppointmentsFetch(id));
    },
    dispatchSchoolContactCalendarFetch: id => {
      dispatch(schoolContactCalendarFetch(id));
    },
    dispatchSchoolInstructorsCalendarFetch: id => {
      dispatch(schoolInstructorsCalendarFetch(id));
    },
  };
};

function mapStateToProps(state) {
  return {
    token: state.token,
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
}

export default connect(
  CalendarOverviewPage,
  mapStateToProps,
  mapDispatchToProps
);
