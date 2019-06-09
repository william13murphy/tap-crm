import React from 'react';
import moment from 'moment';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import { ButtonGroup } from '@blueprintjs/core';
import BackButton from 'components/Buttons/BackButton';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import ModuleHeader from 'components/Layout/ModuleHeader';

import StudentPlanDetailContainer from 'containers/Student/StudentPlanDetailContainer';

import StudentsPage from './Students';
import TotalsPage from './Totals';
import PaymentPage from './Payment';
import FinalizePage from './Finalize';

import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import StudentPlanTerminateFormContainer from 'containers/Student/StudentPlanTerminateFormContainer';

import PlanStatus from './PlanStatus';

import './styles.less';

type PlanDetailModuleProps = {
  match: { params: { schoolId: string } },
};

const PlanDetailModule = (props: PlanDetailModuleProps) => {
  const schoolId = props.match.params.schoolId;
  const finalized =
    props.planDetail.payload && props.planDetail.payload.Finalized;

  const preventDefaultIfNotFinalized = e => {
    if (finalized) {
      return;
    } else {
      e.preventDefault();
    }
  };

  return (
    <Module className="PlanDetailModule">
      <ModuleHeader className="PlanDetail__navigation">
        <div className="PlanDetail__navigation__left">
          <Link to={`/app/school-app/${schoolId}/students/plans`}>
            <BackButton>All Plans</BackButton>
          </Link>
        </div>
        { finalized ? null :
          <div className="PlanDetail__navigation__center">
            <NavLink
              onClick={preventDefaultIfNotFinalized}
              className={`fake-navlink ${finalized ? 'finalized' : ''}`}
              to={`${props.match.url}/students`}
            >
              Students
            </NavLink>
            <NavLink
              onClick={preventDefaultIfNotFinalized}
              className={`fake-navlink ${finalized ? 'finalized' : ''}`}
              to={`${props.match.url}/totals`}
            >
              Totals
            </NavLink>
            <NavLink
              onClick={preventDefaultIfNotFinalized}
              className={`fake-navlink ${finalized ? 'finalized' : ''}`}
              to={`${props.match.url}/payment`}
            >
              Payment
            </NavLink>
            <NavLink
              onClick={preventDefaultIfNotFinalized}
              className={`fake-navlink ${finalized ? 'finalized' : ''}`}
              to={`${props.match.url}/finalize`}
            >
              Finalize
            </NavLink>
          </div>
        }
        <div className="PlanDetail__navigation__right">
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <PlanStatus planDetail={props.planDetail} match={props.match} />
          </StudentPlanDetailContainer>
        </div>
      </ModuleHeader>
      <Route
        path={`${props.match.path}/cancel-plan`}
        render={innerProps => (
          <Modal title="Cancel Plan" closeUrl={props.match.url}>
            <StudentPlanTerminateFormContainer
              dispatchActionOnCloseParams={innerProps.match.params.planId}
              redirectOnSuccess={props.match.url}
            >
              <ConfirmDialog
                title="Are you sure you want to cancel this plan?"
                closeUrl={props.match.url}
                id={innerProps.match.params.planId}
              />
            </StudentPlanTerminateFormContainer>
          </Modal>
        )}
      />
      <Route
        exact
        path={props.match.path}
        render={() => <Redirect to={`${props.match.url}/students`} />}
      />

      <Route
        path={`${props.match.path}/students`}
        render={() => (
          finalized ?
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <FinalizePage backUrl={`${props.match.url}/payment`} />
          </StudentPlanDetailContainer> :
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <StudentsPage
              backUrl={props.match.url}
              nextUrl={`${props.match.url}/totals`}
            />
          </StudentPlanDetailContainer>
        )}
      />

      <Route
        path={`${props.match.path}/totals`}
        render={() => (
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <TotalsPage
              backUrl={`${props.match.url}/students`}
              nextUrl={`${props.match.url}/payment`}
            />
          </StudentPlanDetailContainer>
        )}
      />

      <Route
        path={`${props.match.path}/payment`}
        render={() => (
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <PaymentPage
              backUrl={`${props.match.url}/totals`}
              nextUrl={`${props.match.url}/finalize`}
            />
          </StudentPlanDetailContainer>
        )}
      />

      <Route
        path={`${props.match.path}/finalize`}
        render={() => (
          <StudentPlanDetailContainer
            dispatchFetchParams={props.match.params.planId}
          >
            <FinalizePage backUrl={`${props.match.url}/payment`} />
          </StudentPlanDetailContainer>
        )}
      />
    </Module>
  );
};

const mapStateToProps = state => {
  return {
    planDetail: state.student.planDetail,
  };
};

export default connect(
  PlanDetailModule,
  mapStateToProps
);
