import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import StudentAttendancesContainer from 'containers/Student/StudentAttendancesContainer';
import AttendanceGrid from './AttendanceGrid';
import connect from 'src/redux/connect';

type AttendanceHistoryProps = {
  match: {
    params: {
      studentId: string,
    },
  },
  attendances: {},
};

const AttendanceHistory = (props: AttendanceHistoryProps) => (
  <Page className="AttendanceHistoryPage" title="AttendanceHistory">
    <PageHeader>
      <PageTitle>Attendance History</PageTitle>
    </PageHeader>
    <PageBody>
      <StudentAttendancesContainer
        dispatchFetchParams={props.match.params.studentId}
      >
        <AttendanceGrid data={props.attendances} />
      </StudentAttendancesContainer>
    </PageBody>
  </Page>
);

const mapStateToProps = state => {
  return {
    attendances: state.student.attendances,
  };
};

export default connect(
  AttendanceHistory,
  mapStateToProps
);
