import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import styleVariables from 'styles/_variables';

const EventDay = ({ event, match }) => {
  let eventTypeColor = styleVariables.black;
  let eventTypeBackground = 'transparent'; // @white

  let linkTo = '';
  if (event.type === 'Class') {
    linkTo = {
      pathname: `/app/school-app/${
        match.params.schoolId
      }/dashboard/class-detail/${event.original.ClassId}/${
        event.original.ClassScheduleId
      }`,
      state: {
        data: event.original,
      },
    };
  }

  if (event.type === 'Appointment') {
    linkTo = {
      pathname: `/app/school-app/${
        match.params.schoolId
      }/dashboard/calendar/appointments/${event.original.Id}/detail`,
      state: {
        data: event.original,
      },
    };
  }

  return (
    <Link
      to={linkTo}
      className="CalendarOverviewPage__event__day"
      style={{
        color: eventTypeColor,
        background: eventTypeBackground,
        fontWeight: 'bold',
        width: '100%',
        height: '100%',
        display: 'inline-block',
      }}
    >
      <strong>{event.title}</strong>
      <p>{event.desc}</p>
    </Link>
  );
};

export default connect(
  EventDay,
  () => ({})
);
