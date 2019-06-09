import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPaymentAuthorizationDocumentFetch,
  studentPaymentAuthorizationDocumentResetState,
} from 'src/redux/actionCreators/student/paymentAuthorizationDocument';

import { studentPlanDetailFetch } from 'src/redux/actionCreators/student/planDetail';

const payloadDisplayName = 'Plan PaymentAuthorization Document';

class StudentPlanPaymentAuthorizationDocumentContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.paymentAuthorizationDocument,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentPaymentAuthorizationDocumentFetch(id));
    },
    dispatchActionOnClose: planId => {
      dispatch(studentPlanDetailFetch(planId));
    },
    dispatchResetState: () => {
      dispatch(studentPaymentAuthorizationDocumentResetState());
    },
  };
};

export default connect(
  StudentPlanPaymentAuthorizationDocumentContainer,
  mapStateToProps,
  mapDispatchToProps
);
