import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import BackButton from 'components/Buttons/BackButton';
import PageBody from 'components/Layout/PageBody';

import DataCard from 'components/DataCard';
import InputBlock from 'components/Forms/InputBlock';
import SchoolStyleClassesContainer from 'containers/School/SchoolStyleClassesContainer';
import SchoolStyleFormContainer from 'containers/School/SchoolStyleFormContainer';

import ProgramStudents from 'views/SchoolApp/_shared/ProgramStudents';
import ProgramClassesDataGrid from './ProgramClassesDataGrid';
import './styles.less';

type InstructorProgramDetailProps = {
  token: {
    payload: {
      SchoolId: string,
    },
  },
  studentsByStyle: {
    payload: Array<{}>,
  },
  history: {},
  match: {
    params: {
      id: string,
      schoolId: string,
    },
  },
  location: {
    state: {
      programName: string,
    },
  },
  styleClasses: Array<{}>,
};

const InstructorProgramDetail = (props: InstructorProgramDetailProps) => {
  const schoolId = props.match.params.schoolId;
  const styleId = props.match.params.id;
  return (
    <Page className="InstructorProgramDetailPage" title="Program Detail">
      <PageHeader>
        <PageTitle inline>
          {props.location.state && props.location.state.programName} - Program
          Detail
        </PageTitle>
        <Link to={`/app/school-app/${schoolId}/programs`}>
          <BackButton>Back to Programs</BackButton>
        </Link>
      </PageHeader>
      <PageBody>
        <InputBlock>
          <DataCard title="Class Schedule">
            <SchoolStyleClassesContainer dispatchFetchParams={styleId}>
              <SchoolStyleFormContainer dispatchActionOnCloseParams={styleId}>
                <ProgramClassesDataGrid
                  data={props.styleClasses.payload || []}
                  history={props.history}
                  schoolId={schoolId}
                />
              </SchoolStyleFormContainer>
            </SchoolStyleClassesContainer>
          </DataCard>
        </InputBlock>

        <DataCard title="Enrolled Students">
          <ProgramStudents schoolId={schoolId} styleId={styleId} />
        </DataCard>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    studentsByStyle: state.school.studentsByStyle,
    styleStudentsProgression: state.school.styleStudentsProgression,
    token: state.token,
    styleClasses: state.school.styleClasses,
  };
};

export default connect(
  InstructorProgramDetail,
  mapStateToProps
);
