import React from 'react';
import connect from 'src/redux/connect';

import { Link, Redirect, Route } from 'react-router-dom';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import BackButton from 'components/Buttons/BackButton';
import SchoolClassDetailContainer from 'containers/School/SchoolClassDetailContainer';
import ClassDetailList from '../ClassDetailList';

type ClassDetailProps = {
  classDetail: {
    payload: {},
  },
  match: {
    params: {
      id: string,
      classId: string,
    },
  },
};

class ClassDetailPage extends React.Component {
  props: ClassDetailProps;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page className="classDetailPage" title="Class Detail">
        <SchoolClassDetailContainer
          dispatchFetchParams={this.props.match.params.classId}
        >
          <PageHeader>
            <Link
              to={`/app/school-app/${
                this.props.schoolId
              }/school-detail/classes`}
            >
              <PageTitle inline>
                {this.props.classDetail.payload &&
                  this.props.classDetail.payload.Name}
              </PageTitle>
              <BackButton>Back To Classes</BackButton>
            </Link>
          </PageHeader>
          <PageBody>
            <ClassDetailList />
          </PageBody>
        </SchoolClassDetailContainer>
        <Route
          exact
          path={this.props.match.path}
          render={() => <Redirect to={`${this.props.match.url}/class-info`} />}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    efcUsers: state.administration.efcUsers,
    classDetail: state.school.classDetail,
  };
};

export default connect(ClassDetailPage, mapStateToProps);
