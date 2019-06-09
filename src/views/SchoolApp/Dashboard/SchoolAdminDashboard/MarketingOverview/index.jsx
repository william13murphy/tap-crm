import React from 'react';
import { Route } from 'react-router-dom';
import Modal from 'components/Modal';
import AddMarketingLeadForm from './AddMarketingLeadForm';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import LeadManagementDataGrid from './LeadManagementDataGrid';

import StudentCount from 'views/SchoolApp/Reports/StudentCount';
import NewEnrollmentByProgram from 'views/SchoolApp/Reports/NewEnrollmentByProgram';
import InquiryBySource from 'views/SchoolApp/Reports/InquiryBySource';
import RevenueBySource from 'views/SchoolApp/Reports/RevenueBySource';
import RevenueByPackage from 'views/SchoolApp/Reports/RevenueByPackage';
import LeadByStatus from 'views/SchoolApp/Reports/LeadByStatus';

import StudentCountContainer from 'containers/Report/StudentCountContainer';
import NewEnrollmentByProgramContainer from 'containers/Report/NewEnrollmentByProgramContainer';
import InquiryBySourceContainer from 'containers/Report/InquiryBySourceContainer';
import RevenueBySourceContainer from 'containers/Report/RevenueBySourceContainer';
import RevenueByPackageContainer from 'containers/Report/RevenueByPackageContainer';
import LeadByStatusContainer from 'containers/Report/LeadByStatusContainer';
import SchoolLeadFormContainer from 'containers/School/SchoolLeadFormContainer';
import SchoolMarketingsContainer from 'containers/School/SchoolMarketingsContainer';

import InputBlock from 'components/Forms/InputBlock';
import DataCard from 'components/DataCard';
import './styles.less';

type MarketingOverviewPageProps = {
  match: { params: { schoolId: string } },
};

class MarketingOverviewPage extends React.Component {
  props: MarketingOverviewPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="MarketingOverviewPage" title="Marketing Overview">
        <PageHeader>
          <PageTitle paddingNone>Marketing Overview</PageTitle>
        </PageHeader>
        <Route
          path={
            '/app/school-app/:schoolId/dashboard/marketing-overview/lead/:leadId/edit'
          }
          render={innerProps => {
            let matchedLead =
              this.props.leads.payload &&
              this.props.leads.payload.filter(cV => {
                return cV.Id === innerProps.match.params.leadId;
              })[0];
            let leadFuzzySearchParams = {
              SchoolId: schoolId,
              Term: '',
            };
            return (
              <Modal
                title="Edit Lead"
                closeUrl={`/app/school-app/${schoolId}/dashboard/marketing-overview`}
              >
                <SchoolStylesContainer dispatchFetchParams={schoolId}>
                  <SchoolMarketingsContainer dispatchFetchParams={schoolId}>
                    <SchoolLeadFormContainer
                      update={true}
                      initialValues={matchedLead && matchedLead}
                      dispatchActionOnCloseParams={leadFuzzySearchParams}
                      redirectOnSuccess={`/app/school-app/${schoolId}/dashboard/marketing-overview`}
                    >
                      <AddMarketingLeadForm />
                    </SchoolLeadFormContainer>
                  </SchoolMarketingsContainer>
                </SchoolStylesContainer>
              </Modal>
            );
          }}
        />
        <PageBody>
          <div>
            <h2>Leads</h2>
            <SchoolStylesContainer dispatchFetchParams={schoolId}>
              <LeadManagementDataGrid schoolId={schoolId} />
            </SchoolStylesContainer>
          </div>
          <div>
            <hr />
          </div>
          <div>
            <h2>Marketing Insights</h2>
          </div>
          <InputBlock>
            <div>
              <DataCard title="Inbound Inquiries">
                <InquiryBySourceContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <InquiryBySource />
                </InquiryBySourceContainer>
              </DataCard>
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <DataCard title="Activity Summary">
                <LeadByStatusContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <LeadByStatus columns={2} />
                </LeadByStatusContainer>
              </DataCard>
            </div>
            <div>
              <DataCard title="Student Count">
                <StudentCountContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <StudentCount columns={2} />
                </StudentCountContainer>
              </DataCard>
            </div>
          </InputBlock>
          <div>
            <DataCard title="New Enrollments per Program">
              <NewEnrollmentByProgramContainer
                loading={{ height: 300 }}
                dispatchFetchParams={schoolId}
              >
                <NewEnrollmentByProgram />
              </NewEnrollmentByProgramContainer>
            </DataCard>
          </div>
          <InputBlock>
            <div>
              <DataCard title="Revenue per Program">
                <RevenueByPackageContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <RevenueByPackage columns={2} />
                </RevenueByPackageContainer>
              </DataCard>
            </div>
            <div>
              <DataCard title="Revenue per Source">
                <RevenueBySourceContainer
                  loading={{ height: 300 }}
                  dispatchFetchParams={schoolId}
                >
                  <RevenueBySource columns={2} />
                </RevenueBySourceContainer>
              </DataCard>
            </div>
          </InputBlock>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.school.leads,
  };
};

const ConnectedMarketingOverviewPage = connect(
  MarketingOverviewPage,
  mapStateToProps
);

export default ConnectedMarketingOverviewPage;
