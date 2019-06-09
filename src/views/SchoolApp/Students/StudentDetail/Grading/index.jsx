import React from 'react';

import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ButtonColumn from 'components/ButtonColumn';

import StudentProgressionsByStyleContainer from 'containers/Student/StudentProgressionsByStyleContainer';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import { roles } from 'util/auth/roles';

import ProgramsGrid from './ProgramsGrid';
import ProgressionsGrid from './ProgressionsGrid';
import './styles.less';

type GradingPageProps = {
  match: { params: { schoolId: string } },
  studentId: string,
  UserId: string,
  Role: string,
  styleRank: {
    payload: Array<{}>,
  },
  progressionsByStyle: {
    payload: Array<{}>,
  },
  progressionsByInstructor: {
    payload: Array<{}>,
  },
  styles: {
    payload: Array<{}>,
  },
};

const GradingPage = (props: GradingPageProps) => {
  const schoolId = props.match.params.schoolId;
  const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
  return (
    <Page className="ProgressionsPage" title="Grading">
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/grading`}
        render={innerProps => {
          let matchedStyle = props.styleRank.payload ;

          return (
            <StudentProgressionsByStyleContainer
              dispatchFetchParams={{
                studentId: props.studentId,
                schoolId: schoolId,
                schoolStyleId: EMPTY_GUID ,
              }}
            >
              <ProgressionsGrid
                programName={matchedStyle && matchedStyle.StyleName}
                data={props.progressionsByStyle}
                schoolStyleId={EMPTY_GUID}
                studentId={props.studentId}
                schoolId={schoolId}
              />
            </StudentProgressionsByStyleContainer>
          );
        }}
      />
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    UserId: state.token.payload.UserId,
    Role: state.token.payload.Role,
    styleRank: state.student.styleRank,
    progressionsByStyle: state.student.progressionsByStyle,
    progressionsByInstructor: state.student.progressionsByInstructor,
    styles: state.school.styles,
  };
};

export default connect(
  GradingPage,
  mapStateToProps
);
