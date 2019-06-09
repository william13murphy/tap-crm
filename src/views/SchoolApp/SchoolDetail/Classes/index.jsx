import React from 'react';
import Page from 'components/Layout/Page';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SchoolClassFormContainer from 'containers/School/SchoolClassFormContainer';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolClassesContainer from 'containers/School/SchoolClassesContainer';
import ClassesDataGrid from './ClassesDataGrid';
import AddClassForm from '../../_shared/AddClassForm';

type ClassesPageProps = {
  history: {},
  schoolId: string,
  allSchools: {
    payload: {},
  },
  classes: {
    payload: [],
  },
  dispatchFormPost: Function,
  match: {
    path: string,
    url: string,
  },
};

class ClassesPage extends React.Component {
  props: ClassesPageProps;

  render() {
    return (
      <Page className="ClassesPage" title="Classes">
        <Route
          exact
          path={`${this.props.match.path}/add`}
          render={() => {
            return (
              <Modal
                title="Add Class to Schedule"
                closeUrl={this.props.match.url}
              >
                <SchoolUtilityStaffsContainer
                  dispatchFetchParams={this.props.schoolId}
                >
                  <SchoolStylesContainer
                    dispatchFetchParams={this.props.schoolId}
                  >
                    <SchoolClassFormContainer
                      dispatchActionOnCloseParams={{
                        schoolId: this.props.schoolId,
                      }}
                      redirectOnSuccess={this.props.match.url}
                    >
                      <AddClassForm schoolId={this.props.schoolId} />
                    </SchoolClassFormContainer>
                  </SchoolStylesContainer>
                </SchoolUtilityStaffsContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <Route
            exact
            path={`/app/school-app/${
              this.props.schoolId
            }/school-detail/classes`}
            component={innerProps => (
              <div>
                <PageTitle inline>Classes</PageTitle>
                <Link to={`${this.props.match.url}/add`}>
                  <button className="pt-button pt-intent-primary pt-icon-book">
                    Add New Class
                  </button>
                </Link>
              </div>
            )}
          />
        </PageHeader>

        <PageBody>
          <SchoolStylesContainer dispatchFetchParams={this.props.schoolId}>
            <SchoolClassesContainer dispatchFetchParams={this.props.schoolId}>
              <Route
                exact
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/classes`}
                component={innerProps => (
                  <ClassesDataGrid
                    schoolId={this.props.schoolId}
                    data={this.props.classes.payload || []}
                    history={this.props.history}
                  />
                )}
              />
            </SchoolClassesContainer>
          </SchoolStylesContainer>
        </PageBody>
      </Page>
    );
  }
}
function mapStateToProps(state) {
  return {
    classes: state.school.classes,
  };
}

export default connect(
  ClassesPage,
  mapStateToProps
);
