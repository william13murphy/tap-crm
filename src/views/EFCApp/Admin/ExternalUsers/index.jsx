import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';
import NonEfcUsersSearchContainer from 'containers/Administration/NonEfcUsersSearchContainer';
import NonEfcUsersDataGrid from './NonEfcUsersDataGrid';

import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';
import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';

import SearchNonEfcUsersForm from './SearchNonEfcUsersForm';
import './styles.less';

type ExternalUsersPageProps = {
  nonEfcUsersUpdate: any,
};

const EXTERNAL_USER_PAGE_PATH = '/app/admin/external-users';
const ADD_EXTERNAL_USER_PATH = '/app/admin/external-users/add';
const ADD_CLIENT_USER_FORM_PATH = '/app/admin/external-users/add/client-user';
const ADD_SCHOOL_USER_FORM_PATH = '/app/admin/external-users/add/school-user';

class ExternalUsersPage extends React.Component {
  props: ExternalUsersPageProps;
  render() {
    return (
      <Page className="ExternalUsersPage" title="External Users">
        <PageHeader>
          <PageTitle inline>External Users</PageTitle>
          <div>
            <Link
              to="/app/admin/external-users/add"
              className="pt-button pt-intent-primary pt-icon-new-person"
            >
              Create New External User
            </Link>
          </div>
        </PageHeader>
        <PageBody>
          <Route
            exact
            path={`/app/admin/external-users/:studentId/send-email`}
            render={routerProps => <SendEmailTemplate />}
          />
          <Route
            exact
            path={`/app/admin/external-users/:studentId/send-sms`}
            render={routerProps => <SendSMSTemplate />}
          />
          <div className="NonefcUsers__searchcontainer">
            <NonEfcUsersSearchContainer>
              <SearchNonEfcUsersForm />
            </NonEfcUsersSearchContainer>
          </div>
          {this.props.nonEfcUsersUpdate.payload ? (
            <NonEfcUsersDataGrid />
          ) : null}
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentDetail: state.student.detail,
    nonEfcUsersSearch: state.administration.nonEfcUsersSearch,
    nonEfcUsersUpdate: state.administration.nonEfcUsersUpdate,
  };
};

export default connect(
  ExternalUsersPage,
  mapStateToProps
);
