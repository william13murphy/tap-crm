import React from 'react';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import ClientSchoolsDataGrid from './ClientSchoolsDataGrid';

import './styles.less';

declare var ASSETS_PATH: string;

type ClientSchoolsProps = {
  id: string,
  schools: [],
  title: string,
  clientSchools: {
    payload: [{}],
  },
  history: {},
};

class ClientSchools extends React.Component {
  props: ClientSchoolsProps;
  render() {
    return (
      <Page className="ClientSchoolsPage" title="Schools">
        <PageHeader>
          <PageTitle>{this.props.title}</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="AddClass">
            <Link
              to={`/app/clients/detail/${
                this.props.clientId
              }/schools/add-school`}
              className="pt-button pt-intent-primary"
            >
              <i className="Icon fa fa-building" aria-hidden="true" />
              Add New School
            </Link>
          </div>
          <ClientSchoolsDataGrid
            data={this.props.clientSchools && this.props.clientSchools.payload}
            history={this.props.history}
          />
        </PageBody>
      </Page>
    );
  }
}

export default ClientSchools;
