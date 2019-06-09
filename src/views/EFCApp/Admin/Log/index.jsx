import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import AdminLogContainer from 'containers/Utility/AdminLogContainer';
import AdminLogDataGrid from './AdminLogDataGrid';

type LogPageProps = {
  adminLog: {
    payload: {},
  },
  history: {},
};

class LogPage extends React.Component {
  props: LogPageProps;
  render() {
    return (
      <Page className="LogPage" title="Activity Log">
        <PageHeader>
          <PageTitle paddingNone>Log</PageTitle>
        </PageHeader>
        <PageBody>
          <AdminLogContainer>
            <AdminLogDataGrid
              data={this.props.adminLog}
              history={this.props.history}
            />
          </AdminLogContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminLog: state.utility.adminLog,
  };
};

export default connect(LogPage, mapStateToProps);
