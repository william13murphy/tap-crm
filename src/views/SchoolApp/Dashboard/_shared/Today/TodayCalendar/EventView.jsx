import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import styleVariables from 'styles/_variables';

const EventView = ({ match, event }) => {
  const schoolId = match.params.schoolId;
  let eventTypeColor = styleVariables.black;
  let eventTypeBackground = 'transparent'; // @white

  let linkTo = '';
  if (event.type === 'Class') {
    linkTo = {
      pathname: `/app/school-app/${schoolId}/dashboard/class-detail/${
        event.classId
      }/${event.classScheduleId}`,
      state: {
        data: event,
      },
    };
  }

  if (event.type === 'Appointment') {
    linkTo = {
      pathname: `/app/school-app/${schoolId}/dashboard/calendar/appointments/${
        event.id
      }/detail`,
      state: {
        data: event,
      },
    };
  }

  return (
    <Link
      to={linkTo}
      className="SchoolAdminCalendar__event__day"
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

const mapStateToProps = () => ({});

export default connect(EventView, mapStateToProps);
