import React from 'react';
import { Route } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import InputBlock from 'components/Forms/InputBlock';
import StudentCalendar from './StudentCalendar';
import ClassDetail from './ClassDetail';
import DataCard from 'components/DataCard';
import moment from 'moment';
import StudentTimeline from 'views/StudentApp/Programs/StudentTimeline';
import connect from 'src/redux/connect';
import SchoolClassDetailContainer from 'containers/School/SchoolClassDetailContainer';
import StudentCalendarContainer from 'containers/Student/StudentCalendarContainer';
import StudentMessagesContainer from 'containers/Student/StudentMessagesContainer';
import { calculateLocalDateTimeFromUTCDateAndTime } from 'src/util/localization/timezone';
import './styles.less';

type TodayPageProps = {
  token: {
    payload: {
      UserName: string,
      SchoolId: string,
      StudentId: string,
      TimeZone: string,
    },
  },
  calendar: {
    payload: [],
  },
  messages: {
    payload: [],
  },
  dispatchFormPost: Function,
  history: {},
  references: {},
  myAppointments: {},
  user: {
    payload: {
      Profile: {
        FirstName: string,
      },
    },
  },
};

class TodayPage extends React.Component {
  props: TodayPageProps;

  render() {
    return (
      <Page className="TodayPage" title="Today">
        <Route
          path="/app/dashboard/class-detail/:id"
          render={props => (
            <SchoolClassDetailContainer
              dispatchFetchParams={props.match.params && props.match.params.id}
            >
              <ClassDetail />
            </SchoolClassDetailContainer>
          )}
        />
        <Route
          exact
          path="/app/dashboard"
          render={() => (
            <div>
              <PageHeader>
                <PageTitle paddingNone>
                  Welcome,{' '}
                  {this.props.user &&
                    this.props.user.payload &&
                    this.props.user.payload.Profile.FirstName}
                </PageTitle>
              </PageHeader>
              <PageBody>
                <InputBlock>
                  <StudentCalendarContainer
                    dispatchFetchParams={{
                      StartDate: moment()
                        .subtract(1, 'month')
                        .format(),
                      EndDate: moment()
                        .add(1, 'month')
                        .format(),
                      IsoCountryCode: 'US',
                      SchoolId: this.props.token.payload.SchoolId,
                      StudentId: this.props.token.payload.StudentId,
                    }}
                  >
                    <StudentCalendar
                      calendar={this.props.calendar}
                      myAppointments={this.props.myAppointments}
                      timeZone={this.props.token.payload.TimeZone}
                    />
                  </StudentCalendarContainer>
                  <div>
                    <DataCard title="Notifications">
                      <StudentMessagesContainer
                        dispatchFetchParams={this.props.token.payload.StudentId}
                      >
                        {this.props.messages.payload &&
                          this.props.messages.payload.map(item => {
                            return (
                              <div
                                key={item.Id}
                                className="pt-callout pt-intent-primary"
                                style={{ display: 'block' }}
                              >
                                <div>
                                  <strong>From:</strong> {item.FromFirstName}{' '}
                                  {item.FromLastName}
                                </div>
                                <div>
                                  <strong>Sent:</strong>
                                  {calculateLocalDateTimeFromUTCDateAndTime(
                                    this.props.token.payload.TimeZone,
                                    item.CreatedOn,
                                    item.CreatedOn
                                  ).format('MMMM Do YYYY, h:mm a')}
                                </div>
                                <h3>{item.Detail}</h3>
                              </div>
                            );
                          })}
                      </StudentMessagesContainer>
                    </DataCard>
                    <StudentTimeline />
                  </div>
                </InputBlock>
              </PageBody>
            </div>
          )}
        />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    calendar: state.student.studentCalendar,
    references: state.utility.references,
    myAppointments: state.user.myAppointments,
    messages: state.student.messages,
    user: state.user.me,
  };
}

export default connect(
  TodayPage,
  mapStateToProps
);
