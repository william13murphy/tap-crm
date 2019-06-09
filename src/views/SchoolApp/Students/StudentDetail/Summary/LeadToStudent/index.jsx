import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';

import StudentFormContainer from 'containers/Student/StudentFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import AddSchoolStudentForm from '../../../AddStudent/AddSchoolStudentForm';
import StudentContactFormContainer from 'containers/Student/StudentContactFormContainer';
import AddStudentContactForm from '../../../../_shared/AddStudentContactForm';

import './styles.less';

type LeadToStudentProps = {
  studentDetail: {
    payload: {
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
    },
  },
  contacts: {
    payload: {},
  },
  token: {
    payload: {
      UserId: string,
    },
  },
};

const LeadToStudent = (props: LeadToStudentProps) => {
  const schoolId = props.match.params.schoolId;
  let initialValues = {
    ...props.studentDetail.payload,
    FirstName: props.studentDetail.payload.User.Profile.FirstName,
    LastName: props.studentDetail.payload.User.Profile.LastName,
  };
  return (
    <div className="LeadToStudent">
      <Route
        exact
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentDetail.payload.Id
        }/summary/first-time`}
        render={() => {
          return (
            <Modal
              title="Edit Student Profile"
              closeUrl={`/app/school-app/${schoolId}/students/detail/${
                props.studentDetail.payload.Id
              }/summary`}
            >
              <StateProvinceMasterContainer>
                <StudentFormContainer
                  update
                  initialValues={initialValues}
                  redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                    props.studentDetail.payload.Id
                  }/summary/first-time/add-contact`}
                  dispatchActionOnCloseParams={props.studentDetail.payload.Id}
                >
                  <AddSchoolStudentForm
                    schoolId={schoolId}
                    userId={props.token.payload.UserId}
                    schoolProfile={props.schoolProfile}
                  />
                </StudentFormContainer>
              </StateProvinceMasterContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentDetail.payload.Id
        }/summary/first-time/add-contact`}
        render={() => (
          <Modal
            title="Add Student Contact"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          >
            <StateProvinceMasterContainer>
              <StudentContactFormContainer
                dispatchActionOnCloseParams={props.studentDetail.payload.Id}
                redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                  props.studentDetail.payload.Id
                }/summary/first-time/add-plan`}
              >
                <AddStudentContactForm
                  studentId={props.studentDetail.payload.Id}
                  schoolProfile={props.schoolProfile}
                />
              </StudentContactFormContainer>
            </StateProvinceMasterContainer>

            <Link
              className={`SkipThisStep pt-button pt-intent-primary`}
              to={`/app/school-app/${schoolId}/students/detail/${
                props.studentDetail.payload.Id
              }/summary/first-time/add-plan`}
            >
              Skip this step
            </Link>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentDetail.payload.Id
        }/summary/first-time/add-plan`}
        render={() => (
          <Modal
            title="Add a Student Plan"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          >
            <div className="AddPlan">
              <div className="AddPlan__message">
                <h1>Add a New Plan for the Student, by clicking below !</h1>
              </div>
              <Link
                className={`AddPlan__button pt-button pt-intent-primary`}
                to={`/app/school-app/${schoolId}/students/plans/add/${
                  props.studentDetail.payload.Id
                }`}
              >
                Add Plan
              </Link>
            </div>
          </Modal>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.student.contacts,
    studentDetail: state.student.detail,
    token: state.token,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  LeadToStudent,
  mapStateToProps
);
