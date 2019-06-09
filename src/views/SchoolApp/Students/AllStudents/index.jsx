import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import StudentsDataGrid from './StudentsDataGrid';
import ImportStudentSampleCSV from '../ImportStudentSampleCSV';
import './styles.less';




type AllStudentsPageProps = {
  match: { params: { schoolId: string } },
  schoolAnemicStudents: {
    payload: {},
  },
  history: {},
};

class AllStudentsPage extends React.Component {
  props: AllStudentsPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="AllStudentsPage" title="All Students">
        <PageHeader>
          <PageTitle>Students</PageTitle>

          <div className="AllStudentsPage__action_container">
            <div className="AllStudentsPage__action_item">
              <Link
                style={{marginLeft: '4px'}}
                to={`/app/school-app/${schoolId}/students/new`}
                className="pt-button pt-intent-primary pt-icon-new-person"
              >
                Add Student
              </Link>
            </div>
            <div className="AllStudentsPage__action_item">
              <Link
                to={`/app/school-app/${schoolId}/students/all/import`}
                className="pt-button pt-intent-primary pt-icon-new-person"
              >
                <span className="AllStudentsPage__action_title">
                  Import Students
                </span>
              </Link>
            </div>
            <div className="AllStudentsPage__action_item">
              <ImportStudentSampleCSV />
            </div>
          </div>
        </PageHeader>
        <PageBody>
          <SchoolAnemicStudentsContainer
            alwaysFetch={true}
            dispatchFetchParams={schoolId}
          >
            <StudentsDataGrid
              schoolId={schoolId}
              data={this.props.schoolAnemicStudents.payload || []}
              history={this.props.history}
            />
          </SchoolAnemicStudentsContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolAnemicStudents: state.school.anemicStudents,
  };
};

export default connect(
  AllStudentsPage,
  mapStateToProps
);
