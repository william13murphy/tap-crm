import React from 'react';
import { Route, Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import moment from 'moment';

import Modal from 'components/Modal';

import AddPlanPaymentTermForm from './AddPlanPaymentTermForm';
import StudentPlanPaymentTermFormContainer from 'containers/Student/StudentPlanPaymentTermFormContainer';

import { getReferenceItemOptions } from 'api/referenceItems';
import paymentFrequencyTypes from 'src/redux/data/paymentFrequencyTypes';
import PaymentTermDetails from './PaymentTermDetails';
import ReadOnlyScreen from '../../ReadOnlyScreen';

type PaymentTermProps = {
  plan: any,
  routes: any,
  planDetail: any,
  references: {},
};

const initPorps = {
  plan: {},
  routes: {},
  planDetail: {},
  references: {}
}

const PaymentTerms = (props: PaymentTermProps = initProps) => {
  let planPayload = Object.assign({}, props.plan.payload);
  let addPaymentTermsInitialValues;
  let paymentFrequencyTypeOptions = getReferenceItemOptions(
    'LstPaymentFrequencies',
    props.references
  );

  // Number of Payments by default is calculated bi-weeekly.
  let NumberOfPayment = paymentFrequencyTypes['Two Weeks'];

  // Get the PaymentFrequency value for bi-weekly payments and pass in as the default.
  let PaymentFrequency = paymentFrequencyTypeOptions.find(element => {
    if (element.label === 'Two Weeks') {
      return element;
    }
  });

  if (!props.plan.payload.RenewalDate) {
    const oneYearFromToday = {
      PlanEndDate: moment()
        .add(1, 'year')
        .toDate(),
      RenewalDate: moment()
        .add(1, 'year')
        .toDate(),
    };
    let planPayloadWithRenewalDate = Object.assign(
      {},
      props.plan.payload,
      oneYearFromToday
    );

    addPaymentTermsInitialValues = {
      ...planPayloadWithRenewalDate,
      DownPaymentAmount: props.planDetail ? props.planDetail.StyleSignupTotal : 0,
      PaymentFrequencyId: PaymentFrequency.value,
      NumberOfPayment,
    };
  } else {
    addPaymentTermsInitialValues = {
      ...planPayload,
      DownPaymentAmount: props.planDetail ? props.planDetail.StyleSignupTotal : 0,
      PaymentFrequencyId: PaymentFrequency.value,
      NumberOfPayment,
    };
  }

  return (
    <div className="PaymentTerms">
      <ReadOnlyScreen readOnly={props.readOnly} />
      <div>
        {props.plan.payload.DownPaymentAmount === null ? (
          <div className="pt-card">
            <Link
              to={`${props.match.url}/add-payment-term`}
              className="AddPaymentAccountButton pt-button pt-intent-primary pt-icon-new-person"
            >
              Add Payment Terms
            </Link>
          </div>
        ) : (
          <div>
            <PaymentTermDetails
              paymentTermData={props.plan.payload}
              routes={props.match}
            />
          </div>
        )}
      </div>

      <Route
        exact
        path={`${props.match.path}/add-payment-term`}
        render={() => (
          <Modal title="Add Payment Terms" closeUrl={props.match.url}>
            <StudentPlanPaymentTermFormContainer
              dispatchActionOnCloseParams={props.match.params.planId}
              redirectOnSuccess={props.match.url}
            >
              <AddPlanPaymentTermForm
                initialValues={addPaymentTermsInitialValues}
                planDetail={props.planDetail}
              />
            </StudentPlanPaymentTermFormContainer>
          </Modal>
        )}
      />
      <Route
        exact
        path={`${props.match.path}/edit-payment-term`}
        render={() => {
          let modifiedPlanData = Object.assign({}, props.plan.payload);
          if (modifiedPlanData.PlanEndDate === '9999-12-31T00:00:00') {
            modifiedPlanData.PlanEndDate = null;
          }
          return (
            <Modal title="Edit Payment Terms" closeUrl={props.match.url}>
              <StudentPlanPaymentTermFormContainer
                dispatchActionOnCloseParams={props.match.params.planId}
                redirectOnSuccess={props.match.url}
              >
                <AddPlanPaymentTermForm
                  update
                  initialValues={modifiedPlanData}
                  planDetail={props.planDetail}
                />
              </StudentPlanPaymentTermFormContainer>
            </Modal>
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    plan: state.student.plan,
    references: state.utility.references,
  };
};

export default connect(
  PaymentTerms,
  mapStateToProps
);
