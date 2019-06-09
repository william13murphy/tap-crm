import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import AddPunchCardForm from './AddPunchCardForm';
import StyleRateFormContainer from 'containers/School/StyleRateFormContainer';
import BackButton from 'components/Buttons/BackButton';
import { Link } from 'react-router-dom';
import moment from 'moment';

type AddSchoolPunchCardStyleFormProps = {
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

class PunchCardPage extends React.Component {
  props: AddSchoolPunchCardStyleFormProps;
  render() {
    return (
      <Page title="Add School Program">
        <PageHeader>
          <PageTitle>Add New Sessions Based Rate</PageTitle>
          <Link
            to={`/app/school-app/${
              this.props.schoolId
            }/school-detail/programs/detail/${this.props.styleId}/rates`}
          >
            <BackButton>Back To All Rates</BackButton>
          </Link>
        </PageHeader>
        <PageBody>
          <StyleRateFormContainer
            dispatchActionOnCloseParams={this.props.styleId}
            redirectOnSuccess={`/app/school-app/${
              this.props.schoolId
            }/school-detail/programs/detail/${this.props.styleId}/rates`}
          >
            <AddPunchCardForm
              initialValues={{ StartDate: moment().format() }}
              schoolStyleId={this.props.styleId}
            />
          </StyleRateFormContainer>
        </PageBody>
      </Page>
    );
  }
}

export default PunchCardPage;
