import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import AllSchoolsSearchFuzzyContainer from 'containers/School/AllSchoolsSearchFuzzyContainer';

import SearchStudentForm from './SearchStudentForm';
import StudentsDataGrid from './StudentsDataGrid';
import './styles.less';

type AllStudentsPageProps = {
  allSearchFuzzyUpdate: any,
};

class AllStudentsPage extends React.Component {
  props: AllStudentsPageProps;

  render() {
    return (
      <Page className="AllStudentsPage" title="All Students">
        <PageHeader>
          <PageTitle>All Students</PageTitle>
          <div className="SchoolSearch__fuzzycontainer">
            <AllSchoolsSearchFuzzyContainer>
              <SearchStudentForm />
            </AllSchoolsSearchFuzzyContainer>
          </div>
        </PageHeader>
        <PageBody>
          <StudentsDataGrid data={this.props.allSearchFuzzyUpdate.payload} />
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSearchFuzzyUpdate: state.school.allSearchFuzzyUpdate,
  };
};

export default connect(
  AllStudentsPage,
  mapStateToProps
);
