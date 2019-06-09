import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageFooter from 'components/Layout/PageFooter';
import Modal from 'components/Modal';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import StudentPlanStudentFormContainer from 'containers/Student/StudentPlanStudentFormContainer';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import calculatePageBodyHeight from '../calculatePageBodyHeight';
import AddExistingStudentForm from './AddExistingStudentForm';
import AddNewStudent from './AddNewStudent';
import Members from './Members';
import './styles.less';




type StudentPageProps = {
  planDetail: payload,
};

class StudentsPage extends React.Component {
  constructor() {
    super();
    this.setPageBodyHeight = this.setPageBodyHeight.bind(this);
    this._isMounted = false;

    this.state = {
      pageBodyHeight: 500, // default height
      isDisabled: true,
    };
  }
  setPageBodyHeight = () => {
    this.setState({
      pageBodyHeight: calculatePageBodyHeight(),
    });
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setPageBodyHeight();
      }
    }, 0);
    window.addEventListener('resize', this.setPageBodyHeight);
  }

  componentWillReceiveProps(nextProps) {
    let firstStyleRate = nextProps.studentPlanStudentStyleRatesMany.payload;
    if (firstStyleRate != undefined) {
      if (firstStyleRate[Object.keys(firstStyleRate)[0]] != '') {
        this.setState({
          isDisabled: false,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setPageBodyHeight);
  }
  render() {
    const schoolId = this.props.match.params.schoolId;
    const planDetail = this.props.planDetail.payload;
    const readOnly =
      this.props.planDetail.payload.TerminiationDate ||
      this.props.planDetail.payload.Finalized
        ? true
        : false;
    return (
      <Page className="PlanDetailStudentsPage" title="Plan Detail">
        <PageBody center height={this.state ? this.state.pageBodyHeight : null}>
          <div className="PageBody__content">
            {!readOnly && (
              <div>
                <Link
                  to={`${this.props.match.url}/add-new-student`}
                  className="AddNewStudentButton pt-button pt-intent-primary pt-icon-new-person"
                >
                  Add New Student
                </Link>
                <Link
                  to={`${this.props.match.url}/enroll-student`}
                  className="AddExistingStudentButton pt-button pt-intent-primary pt-icon-person float-right"
                >
                  Add Existing Student
                </Link>
              </div>
            )}
            <Members readOnly={readOnly} />
          </div>

          <Route
            exact
            path={`${this.props.match.path}/add-new-student`}
            render={() => (
              <Modal title="Add New Student" closeUrl={this.props.match.url}>
                <AddNewStudent backUrl={this.props.match.url} />
              </Modal>
            )}
          />

          <Route
            exact
            path={`${this.props.match.path}/enroll-student`}
            render={routeProps => (
              <Modal
                title="Enroll Existing Student"
                closeUrl={this.props.match.url}
              >
                <SchoolAnemicStudentsContainer dispatchFetchParams={schoolId}>
                  <StudentPlanStudentFormContainer
                    dispatchActionOnCloseParams={routeProps.match.params.planId}
                    redirectOnSuccess={this.props.match.url}
                  >
                    <AddExistingStudentForm
                      studentPlanId={routeProps.match.params.planId}
                      students={this.props.anemicStudents}
                      createdBy={this.props.token.payload.UserId}
                    />
                  </StudentPlanStudentFormContainer>
                </SchoolAnemicStudentsContainer>
              </Modal>
            )}
          />
          <Route
            exact
            path={`${this.props.match.path}/enroll-student/:studentId`}
            render={routeProps => (
              <Modal
                title="Enroll Existing Student"
                closeUrl={this.props.match.url}
              >
                <SchoolAnemicStudentsContainer dispatchFetchParams={schoolId}>
                  <StudentPlanStudentFormContainer
                    dispatchActionOnCloseParams={routeProps.match.params.planId}
                    redirectOnSuccess={this.props.match.url}
                  >
                    <AddExistingStudentForm
                      studentPlanId={routeProps.match.params.planId}
                      students={this.props.anemicStudents}
                      createdBy={this.props.token.payload.UserId}
                      initialValues={{
                        StudentId: routeProps.match.params.studentId,
                      }}
                    />
                  </StudentPlanStudentFormContainer>
                </SchoolAnemicStudentsContainer>
              </Modal>
            )}
          />
        </PageBody>

        <PageFooter>
          <div />
          <Link
            className={`pt-button pt-intent-primary ${
              this.state.isDisabled ? 'disabled' : ''
            }`}
            to={this.props.nextUrl}
          >
            Next
          </Link>
        </PageFooter>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    anemicStudents: state.school.anemicStudents,
    planDetail: state.student.planDetail,
    studentPlanStudentStyleRatesMany: state.student.planStudentStyleRatesMany,
  };
};

export default connect(
  StudentsPage,
  mapStateToProps
);
