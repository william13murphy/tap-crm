import React from 'react';
import { Route, Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';

import StudentPlanPaymentAccountFormContainer from 'containers/Student/StudentPlanPaymentAccountFormContainer';
import StudentPlanPaymentAccountDeleteContainer from 'containers/Student/StudentPlanPaymentAccountDeleteContainer';

import PaymentAccountDetails from './PaymentAccountDetails/PaymentAccountDetails';
import AddPaymentAccountForm from './AddPaymentAccountForm';
import ReadOnlyScreen from '../../ReadOnlyScreen';

type paymentAccountsDataProps = {
  paymentAccounts: any,
  routes: any,
};

const PaymentAccount = (props: paymentAccountsDataProps) => {
  return (
    <div className="PaymentAccount">
      <ReadOnlyScreen readOnly={props.readOnly} />
      <div>
        {props.paymentAccounts.payload ? (
          <div>
            <PaymentAccountDetails
              paymentAccounts={props.paymentAccounts.payload}
              routes={props.routes}
            />
          </div>
        ) : (
          <div className="pt-card">
            <Link
              to={`${props.routes.url}/add-payment-account`}
              className="AddPaymentAccountButton pt-button pt-intent-primary pt-icon-new-person"
            >
              Add Payment Account
            </Link>
          </div>
        )}
      </div>
      <Route
        exact
        path={`${props.match.path}/add-payment-account`}
        render={() => (
          <Modal title="Add Payment Account" closeUrl={props.match.url}>
            <StudentPlanPaymentAccountFormContainer
              dispatchActionOnCloseParams={props.match.params.planId}
              redirectOnSuccess={props.match.url}
            >
              <AddPaymentAccountForm planId={props.match.params.planId} />
            </StudentPlanPaymentAccountFormContainer>
          </Modal>
        )}
      />
      <Route
        exact
        path={`${props.match.path}/delete-payment-account`}
        render={() => (
          <Modal title="Delete Payment Account" closeUrl={props.match.url}>
            <StudentPlanPaymentAccountDeleteContainer
              dispatchActionOnCloseParams={props.paymentAccounts.payload.Id}
              redirectOnSuccess={props.match.url}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={props.match.url}
                id={props.paymentAccounts.payload.Id}
              />
            </StudentPlanPaymentAccountDeleteContainer>
          </Modal>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paymentAccounts: state.student.planPaymentAccounts,
  };
};

export default connect(
  PaymentAccount,
  mapStateToProps
);
