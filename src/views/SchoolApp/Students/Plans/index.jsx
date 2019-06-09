
import { Route } from 'react-router-dom';
import AddPlanPage from './AddPlan';
import ConfirmDialog from 'components/ConfirmDialog';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import Module from 'components/Layout/Module';
import PlanDetailPage from './PlanDetail';
import PlansListPage from './PlansList';
import React from 'react';
import StudentPlanDeleteContainer from 'containers/Student/StudentPlanDeleteContainer';
import SchoolBankContainer from 'containers/School/SchoolBankContainer';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';


type PlansModuleProps = {
  match: { params: { schoolId: string } },
  plans: {
    payload: {},
  },
  history: {},
};

class PlansModule extends React.Component {
  props: PlansModuleProps;
  render() {
    return (
      <Module className="PlansModule">
        <Route
          path={`${this.props.match.path}/detail/:planId`}
          render={routerProps => (
            <PlanDetailPage
              id={routerProps.match.params.planId}
              backUrl={this.props.match.url}
            />
          )}
        />

        <Route
          exact
          path={this.props.match.path}
          render={() => (
            <SchoolContactsContainer
              dispatchFetchParams={this.props.match.params.schoolId}
            >
              <SchoolBankContainer
                dispatchFetchParams={this.props.match.params.schoolId}
              >
                <PlansListPage />
              </SchoolBankContainer>
            </SchoolContactsContainer>
          )}
        />

        <Route
          exact
          path={`${this.props.match.path}/add`}
          render={() => <AddPlanPage />}
        />

        <Route
          path={`${this.props.match.path}/delete/:planId`}
          render={innerProps => (
            <Modal title="Delete Student Plan" closeUrl={this.props.match.url}>
              <StudentPlanDeleteContainer
                redirectOnSuccess={this.props.match.url}
                dispatchActionOnCloseParams={innerProps.match.params.schoolId}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={this.props.match.url}
                  id={innerProps.match.params.planId}
                />
              </StudentPlanDeleteContainer>
            </Modal>
          )}
        />

        <Route
          exact
          path={`${this.props.match.path}/add/:studentId`}
          render={routeProps => (
            <AddPlanPage studentId={routeProps.match.params.studentId} />
          )}
        />
      </Module>
    );
  }
}

const mapStateToProps = state => {
  return {
    plans: state.student.plans,
  };
};

export default connect(
  PlansModule,
  mapStateToProps
);
