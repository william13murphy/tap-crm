import React from 'react';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

type HelpDeskPageProps = {};

class HelpDeskPage extends React.Component {
  props: HelpDeskPageProps;
  render() {
    return (
      <Page className="HelpDeskPage" title="Help Desk">
        <PageHeader>
          <PageTitle>Help Desk</PageTitle>
        </PageHeader>
        <PageBody>
          <FreshdeskWidget
            url="https://kinapptech.freshdesk.com"
            submitThanks="Thank you, one of our representatives will respond to you soon!"
          />
        </PageBody>
      </Page>
    );
  }
}

export default HelpDeskPage;
