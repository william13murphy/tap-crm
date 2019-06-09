import React from 'react';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import { appContextSetSchoolId } from 'src/redux/actionCreators/appContext';
import connect from 'src/redux/connect';
import './styles.less';

declare var ASSETS_PATH: string;

type ClientSchoolsCardProps = {
  id: string,
  schools: [],
  title: string,
  clientSchools: {
    payload: [{}],
  },
};

class ClientSchoolsCard extends React.Component {
  props: ClientSchoolsCardProps;
  renderSchools() {
    if (this.props.clientSchools && this.props.clientSchools.payload) {
      return (
        <div>
          <ul>
            {this.props.clientSchools.payload.map((cV, i) => {
              return (
                <Link
                  onClick={() =>
                    this.this.props.dispatchAppContextSetSchoolId(cV.Id)
                  }
                  to={`/app/school-app/${cV.Id}/dashboard`}
                  key={i}
                >
                  <li
                    className="SchoolCard internal pt-card pt-elevation-1"
                    key={i}
                  >
                    <img
                      className="SchoolCard__logo"
                      src={cV.LogoBlobUrl}
                      height="250"
                      width="330"
                    />
                    <h4 className="SchoolCard__title">{cV.Name}</h4>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Schools found.</div>;
    }
  }
  render() {
    return (
      <Page className="ClientSchoolsPage" title="Schools">
        <PageHeader>
          <PageTitle>{this.props.title}</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="Fieldset__toolbar">
            {/*<Link
            to="/app/schools"
            className="pt-button pt-intent-primary"
          >
            Add New School
          </Link>*/}
          </div>
          {this.renderSchools()}
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextSetSchoolId: id => {
      dispatch(appContextSetSchoolId(id));
    },
  };
};

export default connect(
  ClientSchoolsCard,
  mapStateToProps,
  mapDispatchToProps
);
