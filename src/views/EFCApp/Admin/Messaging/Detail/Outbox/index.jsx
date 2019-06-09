import React from 'react';
import connect from 'src/redux/connect';
import OutboxGroupMessagesDataGrid from './OutboxGroupMessagesDataGrid';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import EfcUserOutboxGroupContainer from 'containers/Administration/EfcUserOutboxGroupContainer';

type AdminOutboxProps = {
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

class AdminOutbox extends React.Component {
  props: AdminOutboxProps;
  render() {
    return (
      <Page className="AdminMessagingOutboxPage" title="Outbox">
        <PageHeader>
          <PageTitle inline>Outbox</PageTitle>
          <Link
            to={`${this.props.match.url}/compose`}
            className="pt-button pt-intent-primary pt-icon-edit"
          >
            <span>Compose Message</span>
          </Link>
        </PageHeader>
        <PageBody>
          <EfcUserOutboxGroupContainer dispatchFetchParams={this.props.userId}>
            <OutboxGroupMessagesDataGrid
              schoolId={this.props.schoolId}
              history={this.props.history}
            />
          </EfcUserOutboxGroupContainer>
        </PageBody>
      </Page>
    );
  }
}

export default connect(AdminOutbox);
