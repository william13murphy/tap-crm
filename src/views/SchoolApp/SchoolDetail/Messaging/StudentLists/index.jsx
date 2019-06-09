import React from 'react';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import AllStudentListsDataGrid from './AllStudentListsDataGrid';
import AllStudentListsContainer from 'containers/School/AllStudentListsContainer';

type StudentListsProps = {
  schoolId: string,
  schoolDetail: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
  history: {},
  match: {
    path: string,
    url: string,
  },
};

class StudentLists extends React.Component {
  props: StudentListsProps;
  render() {
    const CREATE_LIST_URL = `${this.props.match.url}/create-list`;
    return (
      <Page className="StudentListsPage" title="Student Lists">
        <PageHeader>
          <PageTitle inline>Student Lists</PageTitle>
          <Link
            to={CREATE_LIST_URL}
            className="pt-button pt-intent-primary pt-icon-add-to-artifact"
          >
            <span>New List of Students</span>
          </Link>
        </PageHeader>
        <PageBody>
          <AllStudentListsContainer dispatchFetchParams={this.props.schoolId}>
            <AllStudentListsDataGrid
              schoolId={this.props.schoolId}
              history={this.props.history}
            />
          </AllStudentListsContainer>
        </PageBody>
      </Page>
    );
  }
}
const mapStateToProps = state => {
  return {
    references: state.utility.references,
    token: state.token,
  };
};
export default connect(StudentLists, mapStateToProps);
