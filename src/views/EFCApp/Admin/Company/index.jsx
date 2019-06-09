import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import './styles.less';

type CompanyPageProps = {
  companyInformation: {
    payload: {},
  },
};

class CompanyPage extends React.Component {
  props: CompanyPageProps;
  render() {
    return (
      <Page className="CompanyPage" title="Company Info">
        <PageHeader>
          <PageTitle paddingNone>Company Information</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="pt-card pt-elevation-3">
            <table className="CompanyInfoTable default-table-shaded">
              <tbody>
                {Object.keys(this.props.companyInformation.payload).map(
                  (cV, i) => {
                    return (
                      <tr key={i}>
                        <td className="key">{cV}</td>
                        <td className="value">
                          {this.props.companyInformation.payload[cV]}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    companyInformation: state.utility.companyInformation,
  };
};

export default connect(CompanyPage, mapStateToProps);

// export default CompanyPage;
