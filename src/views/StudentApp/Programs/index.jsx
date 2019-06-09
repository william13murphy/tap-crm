import React from 'react';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import DataCard from 'components/DataCard';

import StudentAttendanceHistory from './StudentAttendanceHistory';
import StudentAttendancesContainer from 'containers/Student/StudentAttendancesContainer';
import GradingSummary from 'views/SchoolApp/Students/StudentDetail/Summary/GradingSummary';
import StudentDetailContainer from 'containers/Student/StudentDetailContainer';

type StudentProgramsProps = {
  token: { payload: { StudentId: string } },
  attendances: { payload: {} },
};

const StudentPrograms = (props: StudentProgramsProps) => {
  return (
    <Module className="StudentProgramsModule">
      <Page className="StudentProgramsPage" title="Programs">
        <PageHeader>
          <PageTitle>My Programs</PageTitle>
        </PageHeader>
        <PageBody>
          <StudentDetailContainer
            dispatchFetchParams={props.token.payload.StudentId}
          >
            <GradingSummary backUrl="/app/programs" />
          </StudentDetailContainer>
          <StudentAttendancesContainer
            dispatchFetchParams={props.token.payload.StudentId}
          >
            <StudentAttendanceHistory data={props.attendances.payload || []} />
          </StudentAttendancesContainer>
        </PageBody>
      </Page>
    </Module>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    attendances: state.student.attendances,
  };
}

export default connect(
  StudentPrograms,
  mapStateToProps
);
