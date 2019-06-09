import React from 'react';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import AllMessageTemplatesDataGrid from './AllMessageTemplatesDataGrid';
import EfcUserEmailTemplatesContainer from 'containers/Administration/EfcUserEmailTemplatesContainer';
import EfcUserLetterTemplatesContainer from 'containers/Administration/EfcUserLetterTemplatesContainer';
import EfcUserSMSTemplatesContainer from 'containers/Administration/EfcUserSMSTemplatesContainer';

type AdminTemplatesProps = {
  schoolId: string,
  schoolDetail: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
  history: {},
  references: any,
  match: {
    path: string,
    url: string,
  },
};

class AdminTemplates extends React.Component {
  props: AdminTemplatesProps;
  render() {
    const ADD_TEMPLATE_FORM_PATH = `${this.props.match.url}/create-template`;
    return (
      <Page className="AdminMessagingTemplatePage" title="Message Templates">
        <PageHeader>
          <PageTitle inline>Message Templates</PageTitle>
          <Link
            to={ADD_TEMPLATE_FORM_PATH}
            className="pt-button pt-intent-primary pt-icon-new-text-box"
          >
            <span>New Message Template</span>
          </Link>
        </PageHeader>
        <PageBody>
          <EfcUserEmailTemplatesContainer>
            <EfcUserLetterTemplatesContainer>
              <EfcUserSMSTemplatesContainer>
                <AllMessageTemplatesDataGrid
                  schoolId={this.props.schoolId}
                  history={this.props.history}
                  timeZone={this.props.timeZone}
                />
              </EfcUserSMSTemplatesContainer>
            </EfcUserLetterTemplatesContainer>
          </EfcUserEmailTemplatesContainer>
        </PageBody>
      </Page>
    );
  }
}

export default connect(AdminTemplates);
