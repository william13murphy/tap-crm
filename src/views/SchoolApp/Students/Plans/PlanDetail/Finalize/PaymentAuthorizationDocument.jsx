import React from 'react';
import connect from 'src/redux/connect';
import SignatureField from 'components/Forms/SignatureField';
import PlanPaymentAuthorizationSignatureForm from './PaymentAuthorizationSignatureForm';
import StudentAuthorizationSignatureFormContainer from 'containers/Student/StudentAuthorizationSignatureFormContainer';

type PaymentAuthorizationDocumentProps = {
  paymentAuthorizationDocument: {
    payload: any,
  },
  planId: string,
  schoolId: string,
  plan: {
    payload: any,
  },
};

const PaymentAuthorizationDocument = (
  props: planPaymentAuthorizationDocumentProps
) => {
  return (
    <div className="PaymentAuthorizationDocument">
      <div
        dangerouslySetInnerHTML={{
          __html: props.paymentAuthorizationDocument.payload,
        }}
      />
      <div className="position-relative">
        <StudentAuthorizationSignatureFormContainer
          dispatchActionOnCloseParams={props.planId}
          redirectOnSuccess={`/app/school-app/${
            props.schoolId
          }/students/plans/detail/${props.planId}/finalize`}
        >
          <PlanPaymentAuthorizationSignatureForm planId={props.planId} />
        </StudentAuthorizationSignatureFormContainer>
      </div>
    </div>
  );
};

export default PaymentAuthorizationDocument;
