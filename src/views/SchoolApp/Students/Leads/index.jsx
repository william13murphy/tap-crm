import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import { schoolLeadsFetch } from 'src/redux/actionCreators/school/leads';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolLeadFormContainer from 'containers/School/SchoolLeadFormContainer';
import UserAppointmentLeadFormContainer from 'containers/User/UserAppointmentLeadFormContainer';
import ConvertLeadToStudentFormContainer from 'containers/Student/ConvertLeadToStudentFormContainer';

import AppointmentForm from 'views/_shared/User/Appointments/AppointmentForm';
import MarketingLeadGrid from './MarketingLeadGrid';
import AddMarketingLeadForm from './AddMarketingLeadForm';
import LeadFormPage from './LeadFormPage';

type LeadsPageProps = {
  match: { params: { schoolId: string } },
  history: {},
  leads: {
    payload: Array<{
      leadId: string,
    }>,
  },
};

class LeadsPage extends React.Component {
  props: LeadsPageProps;

  render() {
    return (
      <Page className="LeadsPage" title="Leads">
        <Route
          exact
          path={`${this.props.match.path}`}
          render={() => (
            <div>
              <PageHeader>
                <PageTitle inline>Leads</PageTitle>
                <div>
                  <Link
                    to={`${this.props.match.url}/add`}
                    className="pt-button pt-intent-primary pt-icon-new-object"
                  >
                    New Lead
                  </Link>
                </div>
              </PageHeader>
              <PageBody>
                <MarketingLeadGrid
                  schoolId={this.props.match.params.schoolId}
                  data={this.props.leads}
                />
              </PageBody>
            </div>
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/add`}
          render={() => (
            <LeadFormPage
              schoolId={this.props.match.params.schoolId}
              title="Add New Lead"
              initialValues=""
              update={false}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/:leadId/edit`}
          render={innerProps => {
            let matchedLead =
              this.props.leads.payload &&
              this.props.leads.payload.filter(cV => {
                return cV.Id === innerProps.match.params.leadId;
              })[0];
            return (
              <LeadFormPage
                schoolId={this.props.match.params.schoolId}
                title="Edit Lead"
                initialValues={matchedLead}
                update={true}
              />
            );
          }}
        />
        <Route
          exact
          path={`${this.props.match.path}/:leadId/schedule-trial`}
          render={innerProps => (
            <Modal title="Schedule Trial" closeUrl={`${this.props.match.url}`}>
              <UserAppointmentLeadFormContainer
                initialValues={{
                  ...innerProps.location.state.initialValues,
                  StartDate: moment().format(),
                }}
                dispatchActionOnCloseParams={this.props.match.params.schoolId}
                redirectOnSuccess={`${this.props.match.url}`}
              >
                <AppointmentForm />
              </UserAppointmentLeadFormContainer>
            </Modal>
          )}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.school.leads,
  };
};

export default connect(
  LeadsPage,
  mapStateToProps
);
