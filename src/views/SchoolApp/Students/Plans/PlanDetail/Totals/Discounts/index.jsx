import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import DataCard from 'components/DataCard';
import ConfirmDialog from 'components/ConfirmDialog';

import SchoolDiscountsContainer from 'containers/School/SchoolDiscountsContainer';
import SchoolDiscountFormContainer from 'containers/School/SchoolDiscountFormContainer';
import StudentPlanDiscountFormContainer from 'containers/Student/StudentPlanDiscountFormContainer';
import StudentPlanDiscountsContainer from 'containers/Student/StudentPlanDiscountsContainer';
import StudentPlanDiscountDeleteContainer from 'containers/Student/StudentPlanDiscountDeleteContainer';

import StudentPlanDiscountForm from './StudentPlanDiscountForm';
import PlanDiscountsDataGrid from './PlanDiscountsDataGrid';
import ReadOnlyScreen from '../../ReadOnlyScreen';

type DiscountsProps = {
  match: {
    path: string,
    params: { schoolId: string, planId: string, id: string },
    schoolDiscounts: {
      payload: any,
    },
  },
};

const Discounts = (props: DiscountsProps) => {
  return (
    <SchoolDiscountsContainer dispatchFetchParams={props.match.params.schoolId}>
      <Route
        exact
        path={props.match.path}
        render={() => (
          <DataCard title="Discounts">
            <ReadOnlyScreen readOnly={props.readOnly} />

            <Link
              to={`${props.match.url}/add-discount`}
              className="AddDiscountButton pt-button pt-intent-primary"
            >
              Add Discount
            </Link>
            <StudentPlanDiscountsContainer
              dispatchFetchParams={props.match.params.planId}
            >
              <PlanDiscountsDataGrid />
            </StudentPlanDiscountsContainer>
          </DataCard>
        )}
      />

      <Route
        exact
        path={`${props.match.url}/add-discount`}
        render={() => (
          <Modal title="Add Discount" closeUrl={props.match.url}>
            <StudentPlanDiscountFormContainer
              dispatchActionOnCloseParams={props.match.params.planId}
              redirectOnSuccess={props.match.url}
            >
              <StudentPlanDiscountForm
                token={props.token}
                schoolDiscounts={props.schoolDiscounts.payload}
                routeParams={props.match.params.planId}
              />
            </StudentPlanDiscountFormContainer>
          </Modal>
        )}
      />
      <Route
        exact
        path={`${props.match.url}/delete-discount/:planDiscountId`}
        render={routeProps => (
          <Modal title="Delete Discount" closeUrl={props.match.url}>
            <StudentPlanDiscountDeleteContainer
              dispatchActionOnCloseParams={props.match.params.planId}
              redirectOnSuccess={props.match.url}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={props.match.url}
                id={routeProps.match.params.planDiscountId}
              />
            </StudentPlanDiscountDeleteContainer>
          </Modal>
        )}
      />
    </SchoolDiscountsContainer>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    schoolDiscounts: state.school.discounts,
  };
};

export default connect(
  Discounts,
  mapStateToProps
);
