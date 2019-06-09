import React from 'react';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import Module from 'components/Layout/Module';
import PageNav from 'components/Layout/PageNav';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';

import Modal from 'components/Modal';
import StudentListForm from './StudentLists/StudentListForm';
import StudentListFormContainer from 'containers/School/StudentListFormContainer';
import PrivateRoute from 'components/Auth/PrivateRoute';
import SchoolStudentListDetailContainer from 'containers/School/SchoolStudentListDetailContainer';

import TemplateEmailFormContainer from 'containers/School/TemplateEmailFormContainer';
import EmailTemplateForm from './Templates/EmailTemplates/EmailTemplateForm';
import BackButton from 'components/Buttons/BackButton';

import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import TemplateLetterFormContainer from 'containers/School/TemplateLetterFormContainer';
import LetterTemplateForm from './_shared/LetterTemplateForm';

import TemplateSMSFormContainer from 'containers/School/TemplateSMSFormContainer';
import StudentListDetail from './StudentLists/StudentList/StudentListDetail';
import OutboxGroupMessageStudentsDataGrid from './Outbox/OutboxGroupMessageStudentsDataGrid';

import SMSTemplateForm from './Templates/SMSTemplates/SMSTemplateForm';

import FormChoice from 'components/FormChoice';

import SchoolOutbox from './Outbox';
import StudentLists from './StudentLists';
import SchoolTemplates from './Templates';
import AllStudentListsContainer from 'containers/School/AllStudentListsContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import SelectList from './StudentLists/SelectList';

import './styles.less';
import MessageEmailTemplate from './Outbox/MessageEmailTemplate';
import MessageSMSTemplate from './Outbox/MessageSMSTemplate';
import MessageLetterTemplate from './Outbox/MessageLetterTemplate';
import { pdfToBase64String } from 'util/base64';

type SchoolMessagingPageProps = {
  schoolId: string,
  history: {},
  match: {
    path: string,
    url: string,
    params: {
      schoolId: string,
    },
  },
  clientDetail: {
    payload: {},
  },
  schoolDetail: {
    payload: {},
  },
  schoolClient: {
    payload: {},
  },
  token: {
    payload: {
      Role: string,
    },
  },
  dispatchSchoolDetailFetch: any,
  references: [{}],
  templatePlaceholders: [{}],
};

// TODO:  Refresh school settings callback

class SchoolMessaging extends React.Component {
  props: SchoolMessagingPageProps;

  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      numPages: null,
      pageNumber: 1,
      base64data: '',
    };
  }

  componentWillReceiveProps(props) {
    if (props.outboxLetterPost.payload) {
      let base64String = pdfToBase64String(props.outboxLetterPost.payload);
      base64String.then(value => {
        this.setState({
          base64data: value,
        });
      });
    }
  }

  render() {
    return (
      <div className="Messaging">
        <Module className="SchoolMessagingModule" title="School Messaging">
          <PageNav>
            <TabList>
              <NavLink
                to={`${this.props.match.url}/outbox`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Outbox</Tab>
              </NavLink>
              <NavLink
                to={`${this.props.match.url}/templates`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Templates</Tab>
              </NavLink>
              <NavLink
                to={`${this.props.match.url}/studentlists`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Student Lists</Tab>
              </NavLink>
            </TabList>
          </PageNav>
          <div>
            <div className="MessagingTabs inner-tabs">
              <Route
                exact
                path={`${this.props.match.url}/templates/create-template/email`}
                render={() => (
                  <Modal
                    title="Add Email Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <FormChoice
                      className="EmailTemplateTypeChoice"
                      title="Select Email Template Type"
                    >
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/email/student`}
                        className="pt-button pt-intent-primary"
                      >
                        Student
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/email/billing`}
                        className="pt-button pt-intent-primary"
                      >
                        Billing
                      </Link>
                    </FormChoice>
                  </Modal>
                )}
              />
              <Route
                exact
                path={`${this.props.match.url}/outbox/compose`}
                render={() => (
                  <Modal
                    title="Compose Message"
                    closeUrl={`/app/school-app/${
                      this.props.schoolId
                    }/school-detail/messaging/outbox`}
                  >
                    <AllStudentListsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <SelectList schoolId={this.props.schoolId} />
                    </AllStudentListsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/:schoolId/school-detail/messaging/outbox/compose/:listId/email`}
                render={() => {
                  return (
                    <div className="SendListForm">
                      <div className="SendListFormBackLink">
                        <Link
                          to={`/app/school-app/${
                            this.props.schoolId
                          }/school-detail/messaging/outbox`}
                        >
                          <BackButton>Back to Outbox</BackButton>
                        </Link>
                      </div>
                      <MessageEmailTemplate schoolId={this.props.schoolId} />
                    </div>
                  );
                }}
              />
              <Route
                path="/app/school-app/:schoolId/school-detail/messaging/outbox/compose/:listId/sms"
                render={() => {
                  return (
                    <div className="SendListForm">
                      <div className="SendListFormBackLink">
                        <Link
                          to={`/app/school-app/${
                            this.props.schoolId
                          }/school-detail/messaging/outbox`}
                        >
                          <BackButton>Back to Outbox</BackButton>
                        </Link>
                      </div>
                      <MessageSMSTemplate schoolId={this.props.schoolId} />
                    </div>
                  );
                }}
              />
              <Route
                path="/app/school-app/:schoolId/school-detail/messaging/outbox/compose/:listId/letter"
                render={() => {
                  return (
                    <div>
                      <div className="SendListFormBackLink">
                        <Link
                          to={`/app/school-app/${
                            this.props.schoolId
                          }/school-detail/messaging/outbox`}
                        >
                          <BackButton>Back to Outbox</BackButton>
                        </Link>
                      </div>
                      <MessageLetterTemplate schoolId={this.props.schoolId} />
                    </div>
                  );
                }}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/outbox/letter/print`}
                render={() => {
                  return (
                    <div className="PDFDisplay">
                      <Modal
                        title="Outbox letter"
                        closeUrl={`/app/school-app/${
                          this.props.schoolId
                        }/school-detail/messaging/outbox`}
                      >
                        <a
                          href={this.state.base64data}
                          className="pt-button pt-intent-primary"
                          download
                        >
                          Download
                        </a>
                      </Modal>
                    </div>
                  );
                }}
              />
              <Route
                path={`${
                  this.props.match.url
                }/templates/create-template/email/:templateType`}
                render={() => (
                  <Modal
                    title="Add Email Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <TemplatePlaceholdersContainer>
                      <TemplateEmailFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={`${this.props.match.url}/templates`}
                      >
                        <EmailTemplateForm schoolId={this.props.schoolId} />
                      </TemplateEmailFormContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                exact
                path={`${
                  this.props.match.url
                }/templates/create-template/letter`}
                render={() => (
                  <Modal
                    title="Add Email Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <FormChoice
                      className="LetterTemplateTypeChoice"
                      title="Select Letter Template Type"
                    >
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/letter/student`}
                        className="pt-button pt-intent-primary"
                      >
                        Student
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/letter/billing`}
                        className="pt-button pt-intent-primary"
                      >
                        Billing
                      </Link>
                    </FormChoice>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/studentlists/edit-list`}
                render={routerProps => {
                  let initialValues = routerProps.location.state.initialValues;
                  return (
                    <Modal
                      title="Edit Student List"
                      closeUrl={`${this.props.match.url}/studentlists`}
                    >
                      <StudentListFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={`${
                          this.props.match.url
                        }/studentlists`}
                        initialValues={initialValues}
                      >
                        <StudentListForm schoolId={this.props.schoolId} />
                      </StudentListFormContainer>
                    </Modal>
                  );
                }}
              />
              <Route
                path={`${
                  this.props.match.url
                }/templates/create-template/letter/:templateType`}
                render={() => (
                  <Modal
                    title="Add Letter Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <TemplatePlaceholdersContainer>
                      <TemplateLetterFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={`${this.props.match.url}/templates`}
                      >
                        <LetterTemplateForm schoolId={this.props.schoolId} />
                      </TemplateLetterFormContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.url}/templates/create-template/sms`}
                render={() => (
                  <Modal
                    title="Add SMS Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <TemplateSMSFormContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={`${this.props.match.url}/templates`}
                    >
                      <SMSTemplateForm
                        references={this.props.references}
                        role={this.props.token.payload.Role}
                        schoolId={this.props.schoolId}
                      />
                    </TemplateSMSFormContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/outbox/:name/detail`}
                render={routeProps => (
                  <Modal
                    title="Student Details"
                    closeUrl={`/app/school-app/${
                      this.props.schoolId
                    }/school-detail/messaging/outbox`}
                  >
                    <SchoolAnemicStudentsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <OutboxGroupMessageStudentsDataGrid
                        name={routeProps.match.params.name}
                        students={routeProps.location.state.students}
                      />
                    </SchoolAnemicStudentsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/studentlists/detail/:studentListId`}
                render={routeProps => {
                  return (
                    <Modal
                      title="Student list Detail"
                      closeUrl={`/app/school-app/${
                        this.props.schoolId
                      }/school-detail/messaging/studentlists`}
                    >
                      <SchoolStudentListDetailContainer
                        dispatchFetchParams={
                          routeProps.match.params.studentListId
                        }
                      >
                        <StudentListDetail schoolId={this.props.schoolId} />
                      </SchoolStudentListDetailContainer>
                    </Modal>
                  );
                }}
              />
              <Route
                exact
                path={`${this.props.match.url}/templates/create-template`}
                render={() => (
                  <Modal
                    title="Create New Message Template"
                    closeUrl={`${this.props.match.url}/templates`}
                  >
                    <div>
                      <FormChoice className="CreateMessageChoice">
                        <Link
                          to={`${
                            this.props.match.url
                          }/templates/create-template/email`}
                          className="pt-button pt-intent-danger pt-icon-standard pt-icon-envelope"
                        >
                          Email
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                          to={`${
                            this.props.match.url
                          }/templates/create-template/letter`}
                          className="pt-button pt-intent-primary pt-icon-standard pt-icon-document"
                        >
                          Letter
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                          to={`${
                            this.props.match.url
                          }/templates/create-template/sms`}
                          className="pt-button pt-intent-success pt-icon-standard pt-icon-mobile-phone"
                        >
                          SMS
                        </Link>
                      </FormChoice>
                    </div>
                  </Modal>
                )}
              />
              <TabRoutes>
                <Route
                  path="/app/school-app/:schoolId/school-detail/messaging/studentlists"
                  render={() => {
                    return <StudentLists schoolId={this.props.schoolId} />;
                  }}
                />
                <Route
                  path={`${this.props.match.url}/studentlists/create-list`}
                  render={() => (
                    <Modal
                      title="Add Student List"
                      closeUrl={`${this.props.match.url}/studentlists`}
                    >
                      <StudentListFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={`${
                          this.props.match.url
                        }/studentlists`}
                      >
                        <StudentListForm schoolId={this.props.schoolId} />
                      </StudentListFormContainer>
                    </Modal>
                  )}
                />
                <Route
                  path="/app/school-app/:schoolId/school-detail/messaging/templates"
                  render={() => {
                    return <SchoolTemplates schoolId={this.props.schoolId} />;
                  }}
                />
                <Route
                  exact
                  path="/app/school-app/:schoolId/school-detail/messaging"
                  render={() => (
                    <Redirect
                      to={`/app/school-app/${
                        this.props.schoolId
                      }/school-detail/messaging/outbox`}
                    />
                  )}
                />
                <Route
                  exact
                  path={`/app/school-app/${
                    this.props.schoolId
                  }/school-detail/messaging/outbox`}
                  render={() => {
                    return <SchoolOutbox schoolId={this.props.schoolId} />;
                  }}
                />
              </TabRoutes>
            </div>
          </div>
        </Module>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
    schoolDetail: state.school.detail,
    clientDetail: state.client.detail,
    schoolClient: state.school.client,
    templatePlaceholders: state.utility.templatePlaceholders, //
    outboxLetterPost: state.school.outboxLetterPost,
  };
};

export default connect(
  SchoolMessaging,
  mapStateToProps
);
