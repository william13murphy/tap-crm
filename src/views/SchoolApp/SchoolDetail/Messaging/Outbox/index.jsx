import React from 'react';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import SchoolOutboxMessagesContainer from 'containers/School/SchoolOutboxMessagesContainer';
import OutboxGroupMessagesDataGrid from './OutboxGroupMessagesDataGrid';

type SchoolOutboxProps = {
  schoolId: string,
  schoolDetail: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
  history: {},
  match: {
    path: string,
    url: string,
  },
};

class SchoolOutbox extends React.Component {
  props: SchoolOutboxProps;
  render() {
    return (
      <Page className="OutboxPage" title="Outbox">
        <PageHeader>
          <PageTitle inline>Outbox</PageTitle>
          <Link
            to={`/app/school-app/${
              this.props.schoolId
            }/school-detail/messaging/outbox/compose`}
            className="pt-button pt-intent-primary pt-icon-edit"
          >
            <span>Compose Message</span>
          </Link>
        </PageHeader>
        <PageBody>
          <SchoolOutboxMessagesContainer
            dispatchFetchParams={this.props.schoolId}
          >
            <OutboxGroupMessagesDataGrid
              schoolId={this.props.schoolId}
              history={this.props.history}
            />
          </SchoolOutboxMessagesContainer>
        </PageBody>
      </Page>
    );
  }
}
const mapStateToProps = state => {
  return {
    references: state.utility.references,
    token: state.token,
  };
};
export default connect(
  SchoolOutbox,
  mapStateToProps
);
