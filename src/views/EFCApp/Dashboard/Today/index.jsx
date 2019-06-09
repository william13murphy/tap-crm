import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import './styles.less';

type TodayPageProps = {};

class TodayPage extends React.Component {
  props: TodayPageProps;
  render() {
    return (
      <Page className="TodayPage" title="Today">
        <PageHeader>
          <PageTitle paddingNone>Welcome, EFC User.</PageTitle>
        </PageHeader>
        <PageBody />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    efcStudentUnpaid: state.report.efcStudentUnpaid,
    token: state.token,
  };
};

export default connect(
  TodayPage,
  mapStateToProps
);
