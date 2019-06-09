import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import styleVariables from 'styles/_variables';
import connect from 'src/redux/connect';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  convertMomentToCleanDate,
} from 'src/util/localization/timezone';

BigCalendar.momentLocalizer(moment);

function Event({ event }) {
  return (
    <span className="StudentCalendar__event">
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

function EventDay({ event, match }) {
  let eventTypeColor = styleVariables.black;
  let eventTypeBackground = 'transparent'; // @white

  let linkTo = '';
  if (event.type === 'Class') {
    linkTo = {
      pathname: `/app/school-app/${
        match.params.schoolId
      }/dashboard/class-detail/${event.original.ClassId}`,
      state: {
        data: event.original,
      },
    };
  }

  if (event.type === 'Appointment') {
    linkTo = {
      pathname: '/app/dashboard/appointment-detail',
      state: {
        data: event.original,
      },
    };
  }

  return (
    <span
      // to={linkTo}
      className="StudentCalendar__event__day"
      style={{
        color: eventTypeColor,
        background: eventTypeBackground,
        fontWeight: 'bold',
      }}
    >
      <em>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const ConnectedEventDay = connect(
  EventDay,
  () => ({})
);

const customDayPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    };
  else return {};
};

const customSlotPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
    };
  else return {};
};

type StudentCalendarProps = {
  calendar: {
    payload: [],
    error: boolean,
  },
  myAppointments: {
    payload: [],
  },
  timeZone: string,
};

class StudentCalendar extends React.Component {
  props: StudentCalendarProps;

  constructor(props) {
    super(props);
    this.state = {
      calendarData: [],
      appointmentData: [],
    };
  }

  componentDidMount() {
    if (this.props.calendar.payload && !this.props.calendar.error) {
      let calendarData = this.props.calendar.payload.map((item, index) => {
        // let startTime = moment.duration(item.Start).asMilliseconds();
        // let endTime = moment.duration(item.End).asMilliseconds();
        // let startDate = moment(item.Date).add(startTime);
        // let endDate = moment(item.Date).add(endTime);

        // Merge Time & Date, account for local time, and convert to Javascript date object for Calendar:
        let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
          timeZone,
          item.Date,
          item.Start
        );

        let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
          timeZone,
          item.Date,
          item.End
        );
        // Add a day if the end time is before the start time. This can happen sometimes
        // because the time is stored independently of the date in the back end.
        endDateTime = addDayIfEndBeforeStart(startDateTime, endDateTime);
        let start = convertMomentToCleanDate(startDateTime);
        let end = convertMomentToCleanDate(endDateTime);

        return {
          title: item.Style,
          start: start,
          end: end,
          original: item,
          index: index,
          type: 'Class',
        };
      });

      this.setState({ calendarData });
    }

    if (this.props.myAppointments.payload) {
      let appointmentData = this.props.myAppointments.payload.map(
        (item, index) => {
          let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
            timeZone,
            item.StartDate,
            item.StartTimeUtc
          );

          let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
            timeZone,
            item.EndDate,
            item.EndTimeUtc
          );

          endDateTime = addDayIfEndBeforeStart(startDateTime, endDateTime);
          let start = convertMomentToCleanDate(startDateTime);
          let end = convertMomentToCleanDate(endDateTime);

          return {
            title: item.Title,
            start: start,
            end: end,
            original: item,
            type: 'Appointment',
          };
        }
      );

      this.setState({ appointmentData });
    }
  }

  addDayIfEndBeforeStart = (startDateTime, endDateTime) => {
    let finalEndDateTime = endDateTime;

    if (endDateTime.isBefore(startDateTime)) {
      finalEndDateTime = endDateTime.add(1, 'days');
    }

    return finalEndDateTime;
  };

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

  render() {
    return (
      <div className="StudentCalendar">
        <BigCalendar
          eventPropGetter={this.customEventPropGetter}
          selectable={true}
          events={this.state.calendarData.concat(this.state.appointmentData)}
          defaultDate={new Date()}
          defaultView="day"
          components={{
            event: Event,
            day: {
              event: ConnectedEventDay,
            },
          }}
        />
      </div>
    );
  }
}

export default connect(StudentCalendar);
