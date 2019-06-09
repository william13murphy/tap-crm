import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from 'src/redux/data/eventsSchool';
import moment from 'moment';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';

BigCalendar.momentLocalizer(moment);

function Event({ event }) {
  return (
    <span className="AgendaCalendar__event">
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

function EventAgenda({ event }) {
  let eventTypeColor = '#000';
  let eventTypeBackground = '#fff'; // @white
  if (event.type === 'Karate') {
    eventTypeColor = '#1c88a3'; // @cyan-dark
  } else if (event.type === 'Karate BBC') {
    eventTypeColor = '#39b4d1'; // @blood
    eventTypeBackground = '#000'; // @black
  } else if (event.type === 'BJJ') {
    eventTypeColor = '#af2b2b'; // @blood-dark
  } else if (event.type === 'BJJ BBC') {
    eventTypeColor = '#c83535'; // @blood
    eventTypeBackground = '#000'; // @black
  } else if (event.type === 'Muay Thai') {
    eventTypeColor = '#468c4b'; // @olive
  } else if (event.type === 'Demo') {
    eventTypeBackground = 'yellow';
  }
  return (
    <span className="AgendaCalendar__event__agenda">
      <em
        style={{
          color: eventTypeColor,
          background: eventTypeBackground,
          fontWeight: 'bold',
        }}
      >
        {event.title}
      </em>
      <p>{event.desc}</p>
    </span>
  );
}

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

class Agenda extends React.Component {
  render() {
    return (
      <div className="AgendaCalendar" {...this.props}>
        <BigCalendar
          events={events}
          defaultDate={new Date()}
          defaultView="agenda"
          dayPropGetter={customDayPropGetter}
          slotPropGetter={customSlotPropGetter}
          components={{
            event: Event,
            agenda: {
              event: EventAgenda,
            },
          }}
        />
      </div>
    );
  }
}

export default Agenda;
