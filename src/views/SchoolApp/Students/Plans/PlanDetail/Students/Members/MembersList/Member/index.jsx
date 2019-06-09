import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';
import DataCard from 'components/DataCard';
import ConfirmDialog from 'components/ConfirmDialog';

import StudentPlanStudentStyleRateFormContainer from 'containers/Student/StudentPlanStudentStyleRateFormContainer';
import StudentPlanStudentStyleRatesManyContainer from 'containers/Student/StudentPlanStudentStyleRatesManyContainer';
import StudentWaiverGenerateManyContainer from 'containers/Student/StudentWaiverGenerateManyContainer';
import StudentWaiverFormContainer from 'containers/Student/StudentWaiverFormContainer';
import StudentPlanStudentDeleteContainer from 'containers/Student/StudentPlanStudentDeleteContainer';

import StudentStyleRateForm from './StudentStyleRateForm';
import ProgramAndRankDisplay from './ProgramAndRankDisplay';
import StudentWaiverDisplay from './StudentWaiverDisplay';
import MemberProgram from './MemberProgram';
import StudentWaiverSignatureForm from './StudentWaiverSignatureForm';
import './styles.less';

type MemberProps = {
  match: { params: { planId: string } },
  planStudentId: string,
  studentId: string,
  studentDetail: {},
};

const Member = (props: MemberProps) => {
  const studentDetail = props.studentDetailMany.payload[props.studentId];
  if(!studentDetail) {
    return <p className="emptyTable">Student data is unavailable</p>;
  }
  const schoolId = props.match.params.schoolId;
  const fullName =
    studentDetail.User.Profile.FirstName +
    ' ' +
    studentDetail.User.Profile.LastName;
  const planId = props.match.params.planId;

  return (
    <DataCard
      className="Member"
      title={fullName}
      titleLink={`/app/school-app/${
        props.match.params.schoolId
      }/students/detail/${props.studentId}/summary`}
      deleteLink={`${props.match.url}/delete-student/${props.planStudentId}`}
      deleteLinkText="Remove Student"
    >
      <StudentPlanStudentStyleRatesManyContainer
        dispatchFetchParams={props.planStudentId}
      >
        <div>
          {props.studentPlanStudentStyleRatesMany.payload &&
            props.studentPlanStudentStyleRatesMany.payload[
              props.planStudentId
            ] &&
            props.studentPlanStudentStyleRatesMany.payload[
              props.planStudentId
            ].map((studentStyleRate, i) => {
              return (
                <MemberProgram
                  key={i}
                  currentUrl={props.match.url}
                  planStudentId={props.planStudentId}
                  planId={planId}
                  studentDetail={studentDetail}
                  studentStyleRate={studentStyleRate}
                />
              );
            })}
        </div>
      </StudentPlanStudentStyleRatesManyContainer>
      <Link
        to={`${props.match.url}/choose-student-program/${studentDetail.Id}`}
      >
        <button className="pt-button pt-intent-primary">Add Program</button>
      </Link>
      {studentDetail.WaiverBlobUrl ? (
        <a
          href={studentDetail.WaiverBlobUrl}
          className="ViewWaiver__button pt-button float-right pt-intent-success"
        >
          View Waiver
        </a>
      ) : (
        <Link
          to={`${props.match.url}/sign-waiver/${studentDetail.Id}`}
          className="ViewWaiver__button pt-button float-right pt-intent-warning pt-icon-clipboard"
        >
          Sign Waiver
        </Link>
      )}
      <Route
        path={`${props.match.path}/sign-waiver/${studentDetail.Id}`}
        render={routeProps => (
          <Modal
            className="Modal__ViewStudentWaiverForm"
            title={`Sign Waiver for ${fullName}`}
            closeUrl={props.match.url}
          >
            <StudentWaiverGenerateManyContainer
              dispatchFetchParams={studentDetail.Id}
            >
              <StudentWaiverDisplay studentId={studentDetail.Id} />
            </StudentWaiverGenerateManyContainer>
            <StudentWaiverFormContainer
              many
              dispatchActionOnCloseParams={studentDetail.Id}
              redirectOnSuccess={props.match.url}
            >
              <StudentWaiverSignatureForm studentId={studentDetail.Id} />
            </StudentWaiverFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.path}/delete-student/${props.planStudentId}`}
        render={() => (
          <Modal title="Remove Student from Plan" closeUrl={props.match.url}>
            <StudentPlanStudentDeleteContainer
              dispatchActionOnCloseParams={planId}
              redirectOnSuccess={props.match.url}
            >
              <ConfirmDialog
                title="Are you sure you want to remove this student?"
                closeUrl={props.match.url}
                id={props.planStudentId}
              />
            </StudentPlanStudentDeleteContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.path}/choose-student-program/${studentDetail.Id}`}
        render={routeProps => (
          <Modal
            className="Modal__ChooseStudentProgramForm"
            title={`Choose Program for ${fullName}`}
            closeUrl={props.match.url}
          >
            <StudentPlanStudentStyleRateFormContainer
              dispatchActionOnCloseParams={{
                planStudentId: props.planStudentId,
                planId: planId,
              }}
              redirectOnSuccess={props.match.url}
            >
              <StudentStyleRateForm
                form={`choose-student-program-form-${props.iterator}`}
                studentId={studentDetail.Id}
                studentPlanId={planId}
                studentPlanStudentId={props.planStudentId}
                schoolId={schoolId}
              />
            </StudentPlanStudentStyleRateFormContainer>
          </Modal>
        )}
      />
    </DataCard>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    studentDetailMany: state.student.detailMany,
    studentPlanStudentStyleRatesMany: state.student.planStudentStyleRatesMany,
  };
};

export default connect(
  Member,
  mapStateToProps
);
