import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import Modal from 'components/Modal';
import FormChoice from 'components/FormChoice';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import AllEmailTemplatesContainer from 'containers/School/AllEmailTemplatesContainer';
import TemplateEmailFormContainer from 'containers/School/TemplateEmailFormContainer';
import AllLetterTemplatesContainer from 'containers/School/AllLetterTemplatesContainer';
import TemplateLetterFormContainer from 'containers/School/TemplateLetterFormContainer';

import EmailTemplateForm from './EmailTemplateForm';
import LetterTemplateForm from './LetterTemplateForm';
import AllSystemTemplatesDataGrid from './AllSystemTemplatesDataGrid';

type SystemTemplatesProps = {
  schoolId: string,
  schoolDetail: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
  history: {},
  references: any,
  match: {
    path: string,
    url: string,
  },
};

class SystemTemplates extends React.Component {
  props: SystemTemplatesProps;

  render() {
    return (
      <Page className="SystemTemplatePage" title="System Templates">
        <PageHeader>
          <NoDataMessage
            errorMessage="Adding A System Template Will Override the Default Template"
            icon="pt-icon-info-sign"
          />
          <Link
            to={`${this.props.match.url}/create-template`}
            className="pt-button pt-intent-primary pt-icon-new-text-box"
          >
            <span style={{ paddingLeft: '10px' }}>New System Template</span>
          </Link>
        </PageHeader>
        <PageBody>
          <AllEmailTemplatesContainer dispatchFetchParams={this.props.schoolId}>
            <AllLetterTemplatesContainer
              dispatchFetchParams={this.props.schoolId}
            >
              <AllSystemTemplatesDataGrid
                schoolId={this.props.schoolId}
                history={this.props.history}
              />
            </AllLetterTemplatesContainer>
          </AllEmailTemplatesContainer>
        </PageBody>
        <Route
          exact
          path={`${this.props.match.path}/create-template`}
          render={() => (
            <Modal
              title="Create New System Template"
              closeUrl={`${this.props.match.url}`}
            >
              <div>
                <FormChoice className="CreateMessageChoice">
                  <Link
                    to={`${this.props.match.url}/create-template/email`}
                    className="pt-button pt-intent-danger pt-icon-standard pt-icon-envelope"
                  >
                    Email
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to={`${this.props.match.url}/create-template/letter`}
                    className="pt-button pt-intent-primary pt-icon-standard pt-icon-document"
                  >
                    Letter
                  </Link>
                </FormChoice>
              </div>
            </Modal>
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/create-template/email`}
          render={() => (
            <Modal
              title="Select Email Template Type"
              closeUrl={`${this.props.match.url}`}
            >
              <NoDataMessage
                errorMessage={
                  <div>
                    <h4>
                      <strong>Billing Templates:</strong> Payment Failure Email,
                      Billing Plan Summary Email, and POS Purchase Summary Email
                    </h4>
                    <h4>
                      <strong>Student Templates:</strong> Sign-up Email
                    </h4>
                  </div>
                }
                icon="pt-icon-info-sign"
              />
              <FormChoice className="EmailTemplateTypeChoice">
                <Link
                  to={`${
                    this.props.match.url
                  }/templates/create-template/email/billing`}
                  className="pt-button pt-intent-primary"
                >
                  Billing
                </Link>
                &nbsp;&nbsp;
                <Link
                  to={`${
                    this.props.match.url
                  }/templates/create-template/email/student`}
                  className="pt-button pt-intent-primary"
                >
                  Student
                </Link>
              </FormChoice>
            </Modal>
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/create-template/letter`}
          render={() => (
            <Modal
              title="Select Letter Template Type"
              closeUrl={`${this.props.match.url}`}
            >
              <div className="pt-callout pt-callout-icon">
                <span className="pt-icon-large pt-icon-info-sign" />
                <h4>
                  <strong>Billing Templates:</strong> Financial Agreement
                  Letter, Billing Plan Summary Letter
                </h4>
                <h4>
                  <strong>Student Templates:</strong> Waiver Letter
                </h4>
              </div>
              <FormChoice className="LetterTemplateTypeChoice">
                <Link
                  to={`${
                    this.props.match.url
                  }/templates/create-template/letter/billing`}
                  className="pt-button pt-intent-primary"
                >
                  Billing
                </Link>
                &nbsp;&nbsp;
                <Link
                  to={`${
                    this.props.match.url
                  }/templates/create-template/letter/student`}
                  className="pt-button pt-intent-primary"
                >
                  Student
                </Link>
              </FormChoice>
            </Modal>
          )}
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
      </Page>
    );
  }
}
const mapStateToProps = state => {
  return {
    references: state.utility.references,
    token: state.token,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};
export default connect(
  SystemTemplates,
  mapStateToProps
);
