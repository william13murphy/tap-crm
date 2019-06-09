import React from 'react';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import AllMessageTemplatesDataGrid from './AllMessageTemplatesDataGrid';
import AllEmailTemplatesContainer from 'containers/School/AllEmailTemplatesContainer';
import AllLetterTemplatesContainer from 'containers/School/AllLetterTemplatesContainer';
import AllSMSTemplatesContainer from 'containers/School/AllSMSTemplatesContainer';

type SchoolTemplatesProps = {
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

class SchoolTemplates extends React.Component {
  props: SchoolTemplatesProps;
  render() {
    return (
      <Page className="TemplatePage" title="Message Templates">
        <PageHeader>
          <PageTitle inline>Message Templates</PageTitle>
          <Link
            to={`${this.props.match.url}/create-template`}
            className="pt-button pt-intent-primary pt-icon-new-text-box"
          >
            <span>New Message Template</span>
          </Link>
        </PageHeader>
        <PageBody>
          <AllEmailTemplatesContainer dispatchFetchParams={this.props.schoolId}>
            <AllLetterTemplatesContainer
              dispatchFetchParams={this.props.schoolId}
            >
              <AllSMSTemplatesContainer
                dispatchFetchParams={this.props.schoolId}
              >
                <AllMessageTemplatesDataGrid
                  schoolId={this.props.schoolId}
                  history={this.props.history}
                />
              </AllSMSTemplatesContainer>
            </AllLetterTemplatesContainer>
          </AllEmailTemplatesContainer>
        </PageBody>
      </Page>
    );
  }
}
const mapStateToProps = state => {
  return {
    references: state.utility.references,
    token: state.token,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};
export default connect(
  SchoolTemplates,
  mapStateToProps
);
