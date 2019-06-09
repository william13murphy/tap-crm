import { Redirect, Route } from 'react-router-dom';
import { roles } from 'util/auth/roles';
import AddStudentPage from './AddStudent';
import AllStudentsPage from './AllStudents';
import AttachPlanDoc from './Plans/AddPlan/AttachPlanDoc';
import ConfirmDialog from 'components/ConfirmDialog';
import ImportStudents from './ImportStudents';
import LeadsPage from './Leads';
import Modal from 'components/Modal';
import Module from 'components/Layout/Module';
import PlansModule from './Plans';
import ProgramStudents from 'views/SchoolApp/_shared/ProgramStudents';
import React from 'react';
import SchoolLeadsContainer from 'containers/School/SchoolLeadsContainer';
import SchoolMarketingsContainer from 'containers/School/SchoolMarketingsContainer';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';
import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';
import SmartListModule from './SmartList';
import StudentDeleteContainer from 'containers/Student/StudentDeleteContainer';
import StudentDetailPage from './StudentDetail';
import StudentsSubNav from './SubNav';
import ValidateScannedDoc from './Validate';
import './styles.less';
import StudentDetailContainer from 'containers/Student/StudentDetailContainer';






type StudentsModuleProps = {
  history: {},
  match: { params: { schoolId: string } },
};

const StudentsModule = (props: StudentsModuleProps) => {
  return (
    <Module className="StudentsModule">
      <Route
        exact
        path={`${props.match.path}`}
        render={props => (
          <Redirect
            to={`/app/school-app/${props.match.params.schoolId}/students/all`}
          />
        )}
      />
      <Route
        path={`${props.match.path}/all`}
        render={() => <AllStudentsPage />}
      />
      <Route
        exact
        path={`${props.match.path}/all`}
        render={() => <StudentsSubNav />}
      />
      <Route
        exact
        path={`${props.match.path}/all/:studentId/send-email`}
        render={routerProps => <SendEmailTemplate />}
      />
      <Route
        path={`${props.match.path}/new`}
        render={() => <StudentsSubNav />}
        allow={roles.SUBSET_EFC_STAFF}
      />
      <Route
        exact
        path={`${props.match.path}/validate`}
        render={() => <StudentsSubNav />}
        allow={roles.SUBSET_EFC_STAFF}
      />
      <Route
        path={`${props.match.path}/all/delete/:studentId`}
        render={innerProps => {
          return (
            <Modal title="Delete Student" closeUrl={props.match.url}>
              <StudentDeleteContainer
                redirectOnSuccess={props.match.url}
                dispatchActionOnCloseParams={innerProps.match.params.schoolId}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={props.match.url}
                  id={innerProps.match.params.studentId}
                />
              </StudentDeleteContainer>
            </Modal>
          );
        }}
      />
      <Route
        exact
        path={`${props.match.path}/grading`}
        render={() => <StudentsSubNav />}
      />
      <Route
        path={`${props.match.path}/smart-list`}
        render={() => <StudentsSubNav />}
      />
      <Route
        path={`${props.match.path}/leads`}
        render={() => <StudentsSubNav />}
      />
      <Route
        path={`${props.match.path}/plans`}
        render={() => <StudentsSubNav />}
      />
      <Route
        path={`${props.match.path}/detail/:studentId`}
        render={routeProps => (
          <StudentDetailContainer
            dispatchFetchParams={routeProps.match.params.studentId}
          >
            <StudentDetailPage />
          </StudentDetailContainer>
        )}
      />

      <Route
        exact
        path={`${props.match.path}/new`}
        render={() => <AddStudentPage showBackButton={false} />}
      />
      <Route
        exact
        path={`${props.match.path}/validate`}
        render={() => <ValidateScannedDoc />}
      />
      <Route
        exact
        path={`${props.match.path}/add`}
        render={() => <AddStudentPage />}
      />
      <Route
        path={`${props.match.path}/grading`}
        render={() => (
          <div className="Grading" style={{ padding: '20px' }}>
            <h3 className="text-align-center PageHeader">
              Students Ready for Grading
            </h3>
            <ProgramStudents
              schoolId={props.match.params.schoolId}
              styleId={'40fc7ce2-3267-490f-81ce-1e60c545b684'}
              hideActions={true}
            />
          </div>
        )}
      />
      <Route
        path={`${props.match.path}/all/import`}
        render={() => {
          return (
            <Modal
              title="Import Students"
              closeUrl={`/app/school-app/${
                props.match.params.schoolId
              }/students`}
            >
              <ImportStudents />
            </Modal>
          );
        }}
      />

      <Route
        path={`${props.match.path}/smart-list`}
        render={() => <SmartListModule />}
      />
      <Route
        path={`${props.match.path}/leads`}
        render={innerProps => (
          <SchoolMarketingsContainer
            dispatchFetchParams={innerProps.match.params.schoolId}
          >
            <SchoolLeadsContainer
              dispatchFetchParams={innerProps.match.params.schoolId}
            >
              <SchoolStylesContainer
                dispatchFetchParams={innerProps.match.params.schoolId}
              >
                <LeadsPage />
              </SchoolStylesContainer>
            </SchoolLeadsContainer>
          </SchoolMarketingsContainer>
        )}
      />
      <Route
        path={`${props.match.path}/plans`}
        render={() => <PlansModule />}
      />
      <Route
        exact
        path="/app/school-app/:schoolId/students/attach"
        render={routeProps => (
          <Modal title="Attach Scanned Doc" closeUrl={`${props.match.url}/new`}>
            <AttachPlanDoc studentId={routeProps.match.params.studentId} />
          </Modal>
        )}
      />
    </Module>
  );
};

export default StudentsModule;
