import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import BackButton from 'components/Buttons/BackButton';
import { Link } from 'react-router-dom';
import AddSubscriptionForm from './AddSubscriptionForm';
import StyleRateFormContainer from 'containers/School/StyleRateFormContainer';
import moment from 'moment';

type SubscriptionPageProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  styleId: string,
};

class SubscriptionPage extends React.Component {
  props: SubscriptionPageProps;
  render() {
    return (
      <Page title="Add School Program">
        <PageHeader>
          <PageTitle>Add New Subscription</PageTitle>
          <Link
            to={`/app/school-app/${
              this.props.schoolId
            }/school-detail/programs/detail/${this.props.styleId}/rates`}
          >
            <BackButton>Back To All Rates</BackButton>
          </Link>
        </PageHeader>
        <PageBody>
          <div>
            <StyleRateFormContainer
              dispatchActionOnCloseParams={this.props.styleId}
              redirectOnSuccess={`/app/school-app/${
                this.props.schoolId
              }/school-detail/programs/detail/${this.props.styleId}/rates`}
            >
              <AddSubscriptionForm
                initialValues={{ StartDate: moment().format() }}
                schoolStyleId={this.props.styleId}
              />
            </StyleRateFormContainer>
          </div>
        </PageBody>
      </Page>
    );
  }
}

export default SubscriptionPage;
