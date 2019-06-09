import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import connect from 'src/redux/connect';
//import { setGridHeight } from 'src/util';

import CustomToolbar from './CustomToolbar';
import EventView from './EventView';
import {
  createClassEventModel,
  createAppointmentEventModel,
} from './EventModels';
import styleVariables from 'styles/_variables';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';

BigCalendar.momentLocalizer(moment);
const DATE_FORMAT = 'MMM / DD / YYYY'; //TODO - move to configuration


type TodayCalendarProps = {
  schoolId: string,
  calendar: {
    payload: [],
    error: boolean,
  },
  myAppointments: {
    payload: [],
  },
  history: Object,
  timeZone: string,
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  topSectionClassName?: string,
};

class TodayCalendar extends React.Component {
  props: TodayCalendarProps;

  constructor(props) {
    super(props);
    const today = new Date();
    const scrollTime = moment()
      .subtract(3, 'hours')
      .toDate();
    this._isMounted = false;

    this.state = {
      calendarData: [],
      appointmentData: [],
      height: 380,
      scrollTime: scrollTime,
    };
  }
  componentDidMount() {
    this._isMounted = true;

    if (this.props.calendar.payload && !this.props.calendar.error) {
      let calendarData = this.props.calendar.payload.map(item => {
        if (item.Style) {
          return createClassEventModel(item, this.props.timeZone);
        }
      });

      let appointmentData = [];

      if (this.props.myAppointments && this.props.myAppointments.payload) {
        appointmentData = this.props.myAppointments.payload.map(item => {
          return createAppointmentEventModel(item, this.props.timeZone);
        });
      }

      this.setState({ calendarData: calendarData.concat(appointmentData) });
    }

    setTimeout(() => {
      if (this._isMounted) {
        // this.setState({
        //   height: setGridHeight,
        // });
        this.setGridHeight();
      }
    }, 0);
    //window.addEventListener('resize', this.handleResizing);
    window.addEventListener('resize', this.setGridHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    // window.removeEventListener('resize', this.handleResizing);
    window.removeEventListener('resize', this.setGridHeight);
  }

  // handleResizing = event => {
  //   this.setState({
  //     height: setGridHeight(this.props.topSectionClassName, this.props.nav),
  //   });
  // };

  setGridHeight = () => {
    const pageHeaderHeight =
      document.getElementsByClassName('Dashboard__header') &&
      document.getElementsByClassName('Dashboard__header')[0]
        ? document.getElementsByClassName('Dashboard__header')[0].clientHeight
        : 0;

    // Get height of section above the grid
    const bottomSectionHeight =
      document.getElementsByClassName('PageHeader') &&
      document.getElementsByClassName('PageHeader')[0]
        ? document.getElementsByClassName('PageHeader')[0].clientHeight
        : 0;

    const bufferHeight = 40;

    // Calculate table body height
    let tableBodyHeight =
      window.innerHeight -
      (this.props.nav.efcNavHeight +
        this.props.nav.schoolNavHeight +
        this.props.nav.subNavHeight +
        pageHeaderHeight +
        bottomSectionHeight +
        bufferHeight);

    // Minimum table height:
    if (tableBodyHeight < 170) {
      tableBodyHeight = 170;
    }
    this.setState({
      height: tableBodyHeight,
    });
    //return tableBodyHeight;
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
    const schoolId = this.props.schoolId;
    return (
      <div className="TodayCalendar">
        <BigCalendar
          eventPropGetter={this.customEventPropGetter}
          onSelectSlot={slotInfo => {
            this.props.history.push({
              pathname: `/app/school-app/${schoolId}/dashboard/calendar/appointments/add`,
              state: {
                backUrl: `/app/school-app/${schoolId}/dashboard`,
              },
            });
          }}
          scrollToTime={this.state.scrollTime}
          style={{ height: this.state.height }}
          selectable={true}
          events={this.state.calendarData}
          defaultDate={new Date()}
          defaultView="day"
          formats={{
            dayRangeHeaderFormat: (date, culture, localizer) => {
              let start = localizer.format(startDate, DATE_FORMAT);
              let end = localizer.format(endDate, DATE_FORMAT);
              return start + ' — ' + end;
            },
            dateFormat: 'DD',
            dayFormat: (date, culture, localizer) =>
              localizer.format(date, 'ddd MM/DD', culture),
          }}
          components={{
            toolbar: CustomToolbar,
            event: EventView,
            day: {
              event: EventView,
            },
          }}
          views={['day']}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    schoolHealth: state.report.schoolHealth,
  };
};

export default connect(
  TodayCalendar,
  mapStateToProps
);
