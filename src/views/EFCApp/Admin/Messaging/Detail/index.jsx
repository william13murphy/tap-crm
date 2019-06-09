import React from 'react';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import Module from 'components/Layout/Module';
import PageNav from 'components/Layout/PageNav';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';
import BackButton from 'components/Buttons/BackButton';
import Modal from 'components/Modal';
import PrivateRoute from 'components/Auth/PrivateRoute';
import FormChoice from 'components/FormChoice';
import { pdfToBase64String } from 'util/base64';
import '../styles.less';

import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';

import AdminOutbox from './Outbox';
import OutboxGroupMessageStudentsDataGrid from './Outbox/OutboxGroupMessageStudentsDataGrid';

import EfcUserEmailTemplateFormContainer from 'containers/Administration/EfcUserEmailTemplateFormContainer';
import AdminTemplates from './Templates';
import EmailTemplateForm from './Templates/EmailTemplates/EmailTemplateForm';
import MessageEmailTemplate from './Outbox/MessageEmailTemplate';

import EfcUserLetterTemplateFormContainer from 'containers/Administration/EfcUserLetterTemplateFormContainer';
import LetterTemplateForm from './Templates/LetterTemplates/LetterTemplateForm';
import MessageLetterTemplate from './Outbox/MessageLetterTemplate';

import EfcUserSMSTemplateFormContainer from 'containers/Administration/EfcUserSMSTemplateFormContainer';
import SMSTemplateForm from './Templates/SMSTemplates/SMSTemplateForm';
import MessageSMSTemplate from './Outbox/MessageSMSTemplate';

import EfcUserCustomReportsContainer from 'containers/Administration/EfcUserCustomReportsContainer';
import EfcUserCustomReportContainer from 'containers/Administration/EfcUserCustomReportContainer';
import EfcUserCustomReportFormContainer from 'containers/Administration/EfcUserCustomReportFormContainer';
import StudentListForm from './StudentLists/StudentListForm';
import StudentListDetail from './StudentLists/StudentList/StudentListDetail';
import StudentLists from './StudentLists';
import SelectList from './StudentLists/SelectList';
import { getTimeZoneLabel } from 'src/util/localization/timezone';

type DetailPageProps = {
  schoolId: string,
  history: {},
  match: {
    path: string,
    url: string,
    params: {
      schoolId: string,
    },
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

class DetailPage extends React.Component {
  props: DetailPageProps;

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
      <Module className="AdminMessagingDetailModule" title="Detail Messaging">
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
            <TabRoutes>
              <Route
                exact
                path={`${this.props.match.path}/outbox`}
                render={routeProps => {
                  return (
                    <AdminOutbox
                      schoolId={routeProps.match.params.schoolId}
                      userId={this.props.token.payload.UserId}
                    />
                  );
                }}
              />
              <Route
                path={`${this.props.match.path}/templates`}
                render={() => {
                  return <AdminTemplates schoolId={this.props.schoolId} />;
                }}
              />
              <Route
                path={`${this.props.match.path}/studentlists`}
                render={() => {
                  return <StudentLists schoolId={this.props.schoolId} />;
                }}
              />
            </TabRoutes>
          </div>
        </div>

        <Route
          exact
          path={`${this.props.match.path}/outbox/compose`}
          render={() => {
            return (
              <Modal
                title="Compose Message"
                closeUrl={`${this.props.match.url}/outbox`}
              >
                <EfcUserCustomReportsContainer
                  dispatchFetchParams={this.props.match.params.schoolId}
                >
                  <SelectList schoolId={this.props.match.params.schoolId} />
                </EfcUserCustomReportsContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/outbox/compose/:listId/email`}
          render={routeProps => {
            return (
              <div className="SendListForm">
                <div className="SendListFormBackLink">
                  <Link to={`${this.props.match.url}/outbox`}>
                    <BackButton>Back to Outbox</BackButton>
                  </Link>
                </div>
                <MessageEmailTemplate
                  schoolId={this.props.schoolId}
                  userId={this.props.token.payload.UserId}
                />
              </div>
            );
          }}
        />

        <Route
          path={`${this.props.match.path}/outbox/compose/:listId/sms`}
          render={() => {
            return (
              <div className="SendListForm">
                <div className="SendListFormBackLink">
                  <Link to={`${this.props.match.url}/outbox`}>
                    <BackButton>Back to Outbox</BackButton>
                  </Link>
                </div>
                <MessageSMSTemplate
                  schoolId={this.props.schoolId}
                  userId={this.props.token.payload.UserId}
                />
              </div>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/outbox/compose/:listId/letter`}
          render={() => {
            return (
              <div>
                <div className="SendListFormBackLink">
                  <Link to={`${this.props.match.url}/outbox`}>
                    <BackButton>Back to Outbox</BackButton>
                  </Link>
                </div>
                <MessageLetterTemplate
                  schoolId={this.props.schoolId}
                  userId={this.props.token.payload.UserId}
                />
              </div>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/outbox/letter/print`}
          render={routeProps => {
            return (
              <div className="PDFDisplay">
                <Modal
                  title="Outbox letter"
                  closeUrl={`${this.props.match.url}/outbox`}
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
          path={`${this.props.match.path}/outbox/:name/detail`}
          render={routeProps => (
            <Modal
              title="Student Details"
              closeUrl={`${this.props.match.url}/outbox`}
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
          path={`${this.props.match.path}/templates/create-template`}
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
                    to={`${this.props.match.url}/templates/create-template/sms`}
                    className="pt-button pt-intent-success pt-icon-standard pt-icon-mobile-phone"
                  >
                    SMS
                  </Link>
                </FormChoice>
              </div>
            </Modal>
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/templates/create-template/email`}
          render={() => (
            <Modal
              title="Add Email Template"
              closeUrl={`${this.props.match.url}/templates`}
            >
              <FormChoice
                className="EmailTemplateTypeChoice"
                title="Select Email Template Type"
              >
                {/* <PrivateRoute
                  allow={roles.LEVEL_CLADMIN}
                  component={() => (
                    <div>
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/email/user`}
                        className="pt-button pt-intent-primary"
                      >
                        User
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/email/client`}
                        className="pt-button pt-intent-primary"
                      >
                        Client
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/email/school`}
                        className="pt-button pt-intent-primary"
                      >
                        School
                      </Link>
                      &nbsp;&nbsp;
                    </div>
                  )}
                /> */}
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
          path={`${this.props.match.path}/templates/create-template/letter`}
          render={() => (
            <Modal
              title="Add Letter Template"
              closeUrl={`${this.props.match.url}/templates`}
            >
              <FormChoice
                className="LetterTemplateTypeChoice"
                title="Select Letter Template Type"
              >
                {/* <PrivateRoute
                  allow={roles.LEVEL_CLADMIN}
                  component={() => (
                    <div>
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/letter/user`}
                        className="pt-button pt-intent-primary"
                      >
                        User
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/letter/client`}
                        className="pt-button pt-intent-primary"
                      >
                        Client
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        to={`${
                          this.props.match.url
                        }/templates/create-template/letter/school`}
                        className="pt-button pt-intent-primary"
                      >
                        School
                      </Link>
                      &nbsp;&nbsp;
                    </div>
                  )}
                /> */}
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
          path={`${
            this.props.match.path
          }/templates/create-template/email/:templateType`}
          render={() => (
            <Modal
              title="Add Email Template"
              closeUrl={`${this.props.match.url}/templates`}
            >
              <TemplatePlaceholdersContainer>
                <EfcUserEmailTemplateFormContainer
                  dispatchActionOnCloseParams={this.props.schoolId}
                  redirectOnSuccess={`${this.props.match.url}/templates`}
                >
                  <EmailTemplateForm schoolId={this.props.schoolId} />
                </EfcUserEmailTemplateFormContainer>
              </TemplatePlaceholdersContainer>
            </Modal>
          )}
        />

        <Route
          path={`${
            this.props.match.path
          }/templates/create-template/letter/:templateType`}
          render={() => (
            <Modal
              title="Add Letter Template"
              closeUrl={`${this.props.match.url}/templates`}
            >
              <TemplatePlaceholdersContainer>
                <EfcUserLetterTemplateFormContainer
                  dispatchActionOnCloseParams={this.props.token.payload.UserId}
                  redirectOnSuccess={`${this.props.match.url}/templates`}
                >
                  <LetterTemplateForm
                    schoolId={this.props.schoolId}
                    userId={this.props.token.payload.UserId}
                  />
                </EfcUserLetterTemplateFormContainer>
              </TemplatePlaceholdersContainer>
            </Modal>
          )}
        />
        <Route
          path={`${this.props.match.path}/templates/create-template/sms`}
          render={() => (
            <Modal
              title="Add SMS Template"
              closeUrl={`${this.props.match.url}/templates`}
            >
              <EfcUserSMSTemplateFormContainer
                dispatchActionOnCloseParams={this.props.token.payload.UserId}
                redirectOnSuccess={`${this.props.match.url}/templates`}
              >
                <SMSTemplateForm
                  references={this.props.references}
                  role={this.props.token.payload.Role}
                  userId={this.props.token.payload.UserId}
                />
              </EfcUserSMSTemplateFormContainer>
            </Modal>
          )}
        />

        <Route
          path={`${this.props.match.path}/studentlists/create-list`}
          render={() => (
            <Modal
              title="Add Student List"
              closeUrl={`${this.props.match.url}/studentlists`}
            >
              <EfcUserCustomReportFormContainer
                dispatchActionOnCloseParams={this.props.schoolId}
                redirectOnSuccess={`${this.props.match.url}/studentlists`}
              >
                <StudentListForm schoolId={this.props.schoolId} />
              </EfcUserCustomReportFormContainer>
            </Modal>
          )}
        />
        <Route
          path={`${this.props.match.path}/studentlists/edit-list`}
          render={routerProps => {
            let initialValues = routerProps.location.state.initialValues;
            return (
              <Modal
                title="Edit Student List"
                closeUrl={`${this.props.match.url}/studentlists`}
              >
                <EfcUserCustomReportFormContainer
                  dispatchActionOnCloseParams={this.props.schoolId}
                  redirectOnSuccess={`${this.props.match.url}/studentlists`}
                  initialValues={initialValues}
                >
                  <StudentListForm schoolId={this.props.schoolId} />
                </EfcUserCustomReportFormContainer>
              </Modal>
            );
          }}
        />

        <Route
          path={`${this.props.match.path}/studentlists/detail/:studentListId`}
          render={routeProps => {
            return (
              <Modal
                title="Student list Detail"
                closeUrl={`${this.props.match.url}/studentLists`}
              >
                <EfcUserCustomReportContainer
                  dispatchFetchParams={routeProps.match.params.studentListId}
                >
                  <StudentListDetail schoolId={this.props.schoolId} />
                </EfcUserCustomReportContainer>
              </Modal>
            );
          }}
        />
      </Module>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
    templatePlaceholders: state.utility.templatePlaceholders,
    outboxLetterPost: state.school.outboxLetterPost,
  };
};

export default connect(
  DetailPage,
  mapStateToProps
);
