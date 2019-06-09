import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import styleVariables from 'styles/_variables';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import SideNav from 'components/SideNav';
import CalendarFilterForm from './CalendarFilterForm';
import CalendarOverview from './CalendarOverview';
import SchoolInstructorsContainer from 'containers/School/SchoolInstructorsContainer';
import InstructorsCalendarContainer from 'containers/School/InstructorsCalendarContainer';
import SchoolContactCalendarContainer from 'containers/School/SchoolContactCalendarContainer';

type CalendarPageProps = {
  match: { params: { schoolId: string } },
  instructorsCalendar: {
    payload: [],
    error: boolean,
  },
  adminCalendar: {
    payload: [],
    error: boolean,
  },
  token: {
    payload: {
      UserName: string,
      UserId: string,
      TimeZone: string,
    },
  },
  adminAppointments: {
    payload: [],
  },
  instructors: {
    payload: [],
  },
  history: {},
  dispatchFormPost: Function,
};

let startDate = new Date();
let endDate = new Date();

class CalendarPage extends React.Component {
  props: CalendarPageProps;

  constructor(props) {
    super(props);
    this.state = {
      formSelected: {},
    };

    let today = new Date();
    let first = today.getDate() - today.getDay();
    let last = first + 6;

    this.endDate = new Date(today.setDate(last));
    this.startDate = new Date(today.setDate(first));
  }

  handleFormValuesChange = formSelected => {
    this.setState({
      formSelected: formSelected || {},
    });
  };

  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="DashboardCalendarPage" title="Calendar">
        <SideNav>
          <div className="Calendar__filters">
            <SchoolInstructorsContainer dispatchFetchParams={schoolId}>
              <CalendarFilterForm
                instructors={this.props.instructors}
                handleFormValuesChange={this.handleFormValuesChange}
                initialValues={{
                  UserClass: true,
                  UserAppointment: true,
                }}
                checkedUserClass={this.state.formSelected.UserClass}
                checkedUserAppointment={this.state.formSelected.UserAppointment}
              />
            </SchoolInstructorsContainer>
          </div>
        </SideNav>
        <PageHeader>
          <PageTitle inline>Calendar</PageTitle>
          <Link
            to={{
              pathname: `${this.props.match.url}/appointments/add`,
              state: {
                backUrl: `/app/school-app/${
                  this.props.match.params.schoolId
                }/dashboard/calendar`,
              },
            }}
          >
            <button className="pt-button pt-intent-primary pt-icon-time">
              Add New Appointment
            </button>
          </Link>
        </PageHeader>
        <PageBody>
          <SchoolContactCalendarContainer
            dispatchFetchParams={{
              StartDate: moment()
                .subtract(1, 'months')
                .format(),
              EndDate: moment()
                .add(1, 'months')
                .format(),
              IsoCountryCode: 'US',
              SchoolId: schoolId,
              ContactId: this.props.token.payload.UserId,
            }}
          >
            <InstructorsCalendarContainer
              dispatchFetchParams={{
                StartDate: moment()
                  .subtract(1, 'months')
                  .format(),
                EndDate: moment()
                  .add(1, 'months')
                  .format(),
                IsoCountryCode: 'US',
                SchoolId: schoolId,
              }}
            >
              <CalendarOverview
                showUserAppointment={this.state.formSelected.UserAppointment}
                showUserClass={this.state.formSelected.UserClass}
                adminAppointments={this.props.adminAppointments}
                adminCalendar={this.props.adminCalendar}
                instructorsCalendar={this.props.instructorsCalendar}
                startDate={startDate}
                endDate={endDate}
                instructors={this.state.formSelected.Instructors}
                schoolId={schoolId}
              />
            </InstructorsCalendarContainer>
          </SchoolContactCalendarContainer>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    instructors: state.school.instructors,
    instructorsCalendar: state.school.instructorsCalendar,
    adminAppointments: state.user.myAppointments,
    adminCalendar: state.school.contactCalendar,
  };
}

export default connect(
  CalendarPage,
  mapStateToProps
);
