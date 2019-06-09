import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import InputBlock from 'components/Forms/InputBlock';
import DataCard from 'components/DataCard';

import GradingDataGrid from './GradingDataGrid';
import EnrollmentByProgram from 'views/SchoolApp/Reports/EnrollmentByProgram';
// import CumulativeAttendance from 'views/SchoolApp/Reports/CumulativeAttendance';
import AttendanceByProgram from 'views/SchoolApp/Reports/AttendanceByProgram';
import StudentLocation from 'views/SchoolApp/Reports/StudentLocation';

import EnrollmentByProgramContainer from 'containers/Report/EnrollmentByProgramContainer';
// import CumulativeAttendanceContainer from 'containers/Report/CumulativeAttendanceContainer';
import AttendanceByProgramContainer from 'containers/Report/AttendanceByProgramContainer';
import StudentLocationContainer from 'containers/Report/StudentLocationContainer';
import connect from 'src/redux/connect';

import './styles.less';

type SchoolOverviewPageProps = {
  progressionException: {
    payload: [],
  },
  history: {},
  match: { params: { schoolId: string } },
  schoolProfile: {
    payload: any,
  },
};

class SchoolOverviewPage extends React.Component {
  props: SchoolOverviewPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="SchoolOverviewPage" title="School Overview">
        <PageHeader>
          <PageTitle paddingNone>School Overview</PageTitle>
        </PageHeader>
        <PageBody>
          <div>
            <GradingDataGrid
              history={this.props.history}
              data={this.props.progressionException.payload || []}
              schoolId={schoolId}
            />
          </div>
          <InputBlock>
            <div>
              <DataCard title="Current Student Enrollment per Program">
                <EnrollmentByProgramContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <EnrollmentByProgram />
                </EnrollmentByProgramContainer>
              </DataCard>
            </div>
            <div>
              <DataCard title="Student Attendance per Program">
                <AttendanceByProgramContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <AttendanceByProgram columns={2} />
                </AttendanceByProgramContainer>
              </DataCard>
            </div>
          </InputBlock>
          <div>
            <DataCard title="Where Are My Students?">
              <StudentLocationContainer
                loading={{ height: 500 }}
                dispatchFetchParams={schoolId}
              >
                <StudentLocation
                  schoolId={schoolId}
                  schoolProfile={this.props.schoolProfile}
                />
              </StudentLocationContainer>
            </DataCard>
          </div>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    progressionException: state.report.progressionException,
    schoolProfile: state.school.profile,
  };
}

export default connect(
  SchoolOverviewPage,
  mapStateToProps
);
