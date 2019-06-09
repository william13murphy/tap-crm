import React from 'react';
import { Link } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import AddMarketingLeadForm from './AddMarketingLeadForm';
import SchoolLeadFormContainer from 'containers/School/SchoolLeadFormContainer';
import FormWrapper from 'components/Layout/FormWrapper';
import BackButton from 'components/Buttons/BackButton';

const LeadFormPage = props => {
  const leadFuzzySearchParams = {
    SchoolId: props.schoolId,
    Term: '',
  };

  return (
    <Page className="LeadFormPage" title="Lead Form Page">
      <PageHeader>
        <PageTitle>{props.title}</PageTitle>
        <Link to={`/app/school-app/${props.schoolId}/students/leads`}>
          <BackButton>Back To Leads</BackButton>
        </Link>
      </PageHeader>
      <PageBody center>
        <FormWrapper>
          <SchoolLeadFormContainer
            dispatchActionOnCloseParams={leadFuzzySearchParams}
            redirectOnSuccess={`/app/school-app/${
              props.schoolId
            }/students/leads`}
            initialValues={props.initialValues}
            update={props.update}
          >
            <AddMarketingLeadForm />
          </SchoolLeadFormContainer>
        </FormWrapper>
      </PageBody>
    </Page>
  );
};

export { LeadFormPage as default };
