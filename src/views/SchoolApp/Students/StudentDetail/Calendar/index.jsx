import React from 'react';
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/less/styles.less';
import moment from 'moment';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import { studentCalendarFetch } from 'src/redux/actionCreators/student/studentCalendar';

import connect from 'src/redux/connect';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  convertMomentToCleanDate,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';
import styleVariables from 'styles/_variables';
import './styles.less';

BigCalendar.momentLocalizer(moment);

function EventDay({ event, match }) {
  let eventTypeColor = styleVariables.black;
  let eventTypeBackground = 'transparent'; // @white
  return (
    <Link
      to={`/app/school-app/${match.params.schoolId}/dashboard/class-detail`}
      className="Calendar__event__day"
      style={{
        color: eventTypeColor,
        background: eventTypeBackground,
        fontWeight: 'bold',
      }}
    >
      <em>{event.title}</em>
      <p>{event.desc}</p>
    </Link>
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
  return {
    // style: {
    //   backgroundColor: 'red',
    // },
  };
};

type CalendarProps = {
  data: [],
  dispatchStudentCalendarFetch: Function,
  schoolId: string,
  studentId: string,
};

/** Inital start date and end date for the calendar */
const setInitalDate = () => {
  let today = new Date();
  let first = today.getDate() - today.getDay();
  let last = first + 6;
  let endDate = new Date(today.setDate(last));
  let startDate = new Date(today.setDate(first));

  return {
    startDate,
    endDate,
  };
};

let startDate = setInitalDate().startDate;
let endDate = setInitalDate().endDate;

class Calendar extends React.Component {
  props: CalendarProps;

  constructor(props) {
    super(props);
  }

  loadCalendar(startDay, endDay) {
    startDate = startDay;
    endDate = endDay;
    this.props.dispatchStudentCalendarFetch({
      StartDate: moment(startDate).format(),
      EndDate: moment(endDate).format(),
      IsoCountryCode: 'US',
      SchoolId: this.props.schoolId,
      StudentId: this.props.studentId,
    });
  }

  getLastDate = start => {
    let startDate = new Date(start);
    let first = startDate.getDate() - startDate.getDay();
    let last = first + 6;
    let endDate = new Date(startDate.setDate(last));
    return endDate;
  };

  customToolbar = toolbar => {
    const goToBack = () => {
      toolbar.date.setDate(toolbar.date.getDate() - 7);
      let endDate = this.getLastDate(toolbar.date);
      this.loadCalendar(toolbar.date, endDate);
      toolbar.onNavigate('prev');
    };

    const goToNext = () => {
      toolbar.date.setDate(toolbar.date.getDate() + 7);
      let endDate = this.getLastDate(toolbar.date);
      this.loadCalendar(toolbar.date, endDate);
      toolbar.onNavigate('next');
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate('current');
    };

    return (
      <div className="rbc-toolbar">
        <button
          onClick={goToBack}
          type="button"
          className="pt-button Toolbar__arrow"
        >
          <i
            className={'fa fa-caret-left'}
            style={{
              color: styleVariables.cyan_dark,
              fontSize: '24px',
            }}
          />
        </button>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <button
          onClick={goToNext}
          type="button"
          className="pt-button Toolbar__arrow"
        >
          {' '}
          <i
            className={'fa fa-caret-right'}
            style={{
              color: styleVariables.cyan_dark,
              fontSize: '24px',
            }}
          />
        </button>
      </div>
    );
  };

  addDayIfEndBeforeStart = (startDateTime, endDateTime) => {
    let finalEndDateTime = endDateTime;

    if (endDateTime.isBefore(startDateTime)) {
      finalEndDateTime = endDateTime.add(1, 'days');
    }

    return finalEndDateTime;
  };

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
    return (
      <Page className="CalendarPage" title="Calendar">
        <PageHeader>
          <PageTitle>Calendar</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="Calendar">
            <BigCalendar
              slotPropGetter={customSlotPropGetter}
              events={this.props.data.map(item => {
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

                endDateTime = this.addDayIfEndBeforeStart(
                  startDateTime,
                  endDateTime
                );
                let start = convertMomentToCleanDate(startDateTime);
                let end = convertMomentToCleanDate(endDateTime);

                return {
                  title: item.Style,
                  start: start,
                  end: end,
                };
              })}
              defaultDate={startDate}
              defaultView="agenda"
              formats={{
                agendaHeaderFormat: (date, culture, localizer) => {
                  let start = localizer.format(startDate, 'DD MMM YYYY');
                  let end = localizer.format(endDate, 'DD MMM YYYY');
                  return start + ' — ' + end;
                },
              }}
              components={{
                day: {
                  event: ConnectedEventDay,
                },
                toolbar: this.customToolbar,
              }}
            />
          </div>
        </PageBody>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchStudentCalendarFetch: id => {
      dispatch(studentCalendarFetch(id));
    },
  };
};

function mapStateToProps(state) {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
}

export default connect(
  Calendar,
  mapStateToProps,
  mapDispatchToProps
);
