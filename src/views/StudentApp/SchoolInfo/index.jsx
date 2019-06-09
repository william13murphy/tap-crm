import React from 'react';
import Module from 'components/Layout/Module';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import DataCard from 'components/DataCard';
import InputBlock from 'components/Forms/InputBlock';
import SchoolContactInfoCard from './SchoolContactInfoCard';
import InstructorContactInfoCard from './InstructorContactInfoCard';
import StudentInstructorContainer from 'containers/Student/StudentInstructorContainer';
import StudentSchoolContainer from 'containers/Student/StudentSchoolContainer';
import './styles.less';

type SchoolInfoModuleProps = {
  token: {
    payload: {
      UserName: string,
      SchoolId: string, // We can use token SchoolId here because we are in the StudentApp.
      StudentId: string,
    },
  },
  instructor: {
    payload: [],
  },
  school: {
    payload: {
      Name: string,
    },
  },
  references: {},
};

const SchoolInfoModule = (props: SchoolInfoModuleProps) => {
  const schoolId = props.token.payload.SchoolId;
  return (
    <Module className="SchoolInfoModule">
      <Page className="SchoolInfoPage" title="School Info">
        <StudentInstructorContainer
          dispatchFetchParams={props.token.payload.StudentId}
        >
          <StudentSchoolContainer dispatchFetchParams={schoolId}>
            <PageHeader>
              <PageTitle>
                {props.school.payload && props.school.payload.Name}
              </PageTitle>
            </PageHeader>
            <PageBody>
              <InputBlock>
                <SchoolContactInfoCard
                  references={props.references}
                  data={props.school.payload}
                />
                <InstructorContactInfoCard data={props.instructor.payload} />
              </InputBlock>
            </PageBody>
          </StudentSchoolContainer>
        </StudentInstructorContainer>
      </Page>
    </Module>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    instructor: state.student.instructor,
    school: state.student.school,
    references: state.utility.references,
  };
}

export default connect(SchoolInfoModule, mapStateToProps);
