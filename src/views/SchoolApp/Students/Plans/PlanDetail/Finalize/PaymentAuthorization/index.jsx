import React from 'react';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

import StudentPlanPaymentAuthorizationDocumentContainer from 'containers/Student/StudentPlanPaymentAuthorizationDocumentContainer';
import PaymentAuthorizationDocument from './PaymentAuthorizationDocument';
import './styles.less';

type PaymentAuthorizationProps = {
  paymentAuthorizationDocument: {
    payload: any,
  },
  planId: string,
  schoolId: string,
};

const PaymentAuthorization = (props: PaymentAuthorizationProps) => {
  return (
    <div className="PaymentAuthorization">
      <Modal
        title="Plan Payment Authorization Document"
        closeUrl={props.match.url}
      >
        <StudentPlanPaymentAuthorizationDocumentContainer
          dispatchFetchParams={props.match.params.planId}
          redirectOnSuccess={props.match.url}
        >
          <PaymentAuthorizationDocument
            paymentAuthorizationDocument={props.paymentAuthorizationDocument}
            planId={props.match.params.planId}
            schoolId={props.match.params.schoolId}
          />
        </StudentPlanPaymentAuthorizationDocumentContainer>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paymentAuthorizationDocument: state.student.paymentAuthorizationDocument,
  };
};

export default connect(
  PaymentAuthorization,
  mapStateToProps
);
