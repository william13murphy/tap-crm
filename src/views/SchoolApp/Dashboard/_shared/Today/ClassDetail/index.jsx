import React from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import BackButton from 'components/Buttons/BackButton';
import PageBody from 'components/Layout/PageBody';

import InputBlock from 'components/Forms/InputBlock';
import DataCard from 'components/DataCard';
import Modal from 'components/Modal';
import ClassAnnouncementForm from './ClassAnnouncementForm';
import ClassInfo from './ClassInfo';

import SchoolClassScheduleStudentsContainer from 'containers/School/SchoolClassScheduleStudentsContainer';
import SchoolClassScheduleAuthorizedContainer from 'containers/School/SchoolClassScheduleAuthorizedContainer';
import SchoolClassScheduleProgressionContainer from 'containers/School/SchoolClassScheduleProgressionContainer';
import ClassProgressionDataGrid from './ClassProgressionDataGrid';
import CheckInStudents from './CheckInStudents';
import RankRequirementsDataGrid from './RankRequirementsDataGrid';
import StudentRankRequirementsByStyleContainer from 'containers/Student/StudentRankRequirementsByStyleContainer';

import './styles.less';

type ClassDetailPageProps = {
  classDetail: {
    payload: Object,
  },
  classScheduleAuthorized: Array<{}>,
  classId: string,
  match: {
    params: {
      schoolId: string,
      classScheduleId: string,
    },
    url: string,
  },
  classScheduleStudents: {
    payload: [{}],
  },
  classScheduleProgression: {
    payload: [{}],
  },
  UserId: string,
  history: string,
  rankRequirementsByStyle: {
    payload: [{}],
  },
};

const StudentsAttendanceComponent = props => {
  if (props.students && props.students.length > 0) {
    return <div>{props.students[0].StudentId}</div>;
  } else {
    return <div>No students are currently enrolled in this class</div>;
  }
};

const ClassDetailPage = (props: ClassDetailPageProps) => {
  const schoolId = props.match.params.schoolId;
  let classDetail = props.classDetail.payload ? props.classDetail.payload : {};

  const classScheduleId = props.match.params.classScheduleId;

  const classSchedule = classDetail.Schedules.filter(cV => {
    return classScheduleId === cV.Id;
  })[0];

  return (
    <Page className="ClassDetailPage" title="Class Detail">
      <PageHeader>
        <PageTitle paddingNone inline>
          {classDetail.Name}
        </PageTitle>
        <Link to={`/app/school-app/${schoolId}/dashboard/calendar`}>
          <BackButton>Back to Dashboard</BackButton>
        </Link>
      </PageHeader>
      <PageBody>
        <SchoolClassScheduleStudentsContainer
          dispatchFetchParams={classScheduleId}
        >
          <DataCard>
            <ClassInfo
              schoolId={schoolId}
              classDetail={props.classDetail}
              classScheduleId={classScheduleId}
            />
          </DataCard>

          <DataCard
            title={`Class Attendance: ${(props.classScheduleStudents &&
              props.classScheduleStudents.payload &&
              props.classScheduleStudents.payload.length) ||
              0} Students Checked In`}
          >
            <Link
              className="CheckInStudentLink"
              to={`${props.match.url}/check-in`}
            >
              <button className="pt-button pt-intent-primary pt-icon-tick">
                Check In Student
              </button>
            </Link>
            <SchoolClassScheduleProgressionContainer
              dispatchFetchParams={{
                Id: classSchedule.Id,
                SchoolId: schoolId,
              }}
            >
              <ClassProgressionDataGrid
                data={props.classScheduleProgression.payload}
                history={props.history}
                schoolId={schoolId}
                classId={props.classId}
                classScheduleId={classScheduleId}
              />
            </SchoolClassScheduleProgressionContainer>
          </DataCard>
        </SchoolClassScheduleStudentsContainer>

        <Route
          path={`${props.match.path}/check-in`}
          render={() => (
            <Modal
              className="CheckInStudentModal"
              title="Check-In Student"
              closeUrl={props.match.url}
            >
              <SchoolClassScheduleAuthorizedContainer
                dispatchFetchParams={classSchedule.Id}
              >
                <CheckInStudents
                  classScheduleId={classScheduleId}
                  redirectOnSuccess={props.match.url}
                />
              </SchoolClassScheduleAuthorizedContainer>
            </Modal>
          )}
        />
        <Route
          path={`${props.match.path}/rank-requirements`}
          render={routerProps => {
            let initialValues = routerProps.location.state.initialValues;
            return (
              <Modal
                closeUrl={`${props.match.url}`}
                title={`Rank Requirements for ${initialValues.FirstName}
                ${initialValues.LastName}`}
              >
                <StudentRankRequirementsByStyleContainer
                  dispatchFetchParams={{
                    StudentId: initialValues.StudentId,
                    SchoolStyleId: initialValues.Progressions[0].SchoolStyleId,
                    StyleRankId: initialValues.Progressions[0].RankId,
                  }}
                >
                  <RankRequirementsDataGrid
                    classId={props.classId}
                    data={props.rankRequirementsByStyle.payload}
                    schoolId={schoolId}
                  />
                </StudentRankRequirementsByStyleContainer>
              </Modal>
            );
          }}
        />
      </PageBody>
    </Page>
  );
};

const mapStateToProps = function(state) {
  return {
    classDetail: state.school.classDetail,
    classScheduleStudents: state.school.classScheduleStudents,
    classScheduleProgression: state.school.classScheduleProgression,
    UserId: state.token.payload.UserId,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
  };
};

export default connect(
  ClassDetailPage,
  mapStateToProps
);
