import React from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import SchoolMarketingsContainer from 'containers/School/SchoolMarketingsContainer';
import SchoolMarketingFormContainer from 'containers/School/SchoolMarketingFormContainer';
import MarketingGrid from './MarketingGrid';
import AddMarketingForm from './AddMarketingForm';

type MarketingsPageProps = {
  history: {},
  token: {
    payload: {
      SchoolId: string,
    },
  },
  marketings: {},
  schoolId: string,
  match: {
    path: string,
    url: string,
  },
};

class MarketingsPage extends React.Component {
  props: MarketingsPageProps;
  render() {
    return (
      <Page className="MarketingsPage" title="Campaigns">
        <Route
          path={`${this.props.match.path}/add`}
          render={() => {
            return (
              <Modal title="Add New Campaign" closeUrl={this.props.match.url}>
                <SchoolMarketingsContainer
                  dispatchFetchParams={this.props.schoolId}
                >
                  <SchoolMarketingFormContainer
                    redirectOnSuccess={this.props.match.url}
                    dispatchActionOnCloseParams={this.props.schoolId}
                  >
                    <AddMarketingForm
                      schoolId={this.props.schoolId}
                      initialValues={{ StartDate: moment().format() }}
                    />
                  </SchoolMarketingFormContainer>
                </SchoolMarketingsContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/:marketingId/edit`}
          render={innerProps => {
            return (
              <Modal title="Edit Campaign" closeUrl={this.props.match.url}>
                <SchoolMarketingsContainer
                  dispatchFetchParams={this.props.schoolId}
                >
                  <SchoolMarketingFormContainer
                    initialValues={innerProps.location.state.initialValues}
                    redirectOnSuccess={this.props.match.url}
                    dispatchActionOnCloseParams={this.props.schoolId}
                  >
                    <AddMarketingForm schoolId={this.props.schoolId} />
                  </SchoolMarketingFormContainer>
                </SchoolMarketingsContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <PageTitle inline>Campaigns</PageTitle>
          <div>
            <Link
              to={`${this.props.match.url}/add`}
              className="pt-button pt-intent-primary pt-icon-lightbulb"
            >
              Add New Campaign
            </Link>
          </div>
        </PageHeader>
        <PageBody>
          <SchoolMarketingsContainer dispatchFetchParams={this.props.schoolId}>
            <MarketingGrid
              schoolId={this.props.schoolId}
              data={this.props.marketings}
              match={this.props.match}
            />
          </SchoolMarketingsContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    marketings: state.school.marketings,
  };
};

export default connect(
  MarketingsPage,
  mapStateToProps
);
