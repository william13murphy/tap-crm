import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  planPaymentAccountsFetch,
  planPaymentAccountsResetState,
} from 'src/redux/actionCreators/student/planPaymentAccounts';

const payloadDisplayName = 'Plan Payment Accounts';

class StudentPlanPaymentAccountContainer extends React.Component {
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
    data: state.student.planPaymentAccounts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(planPaymentAccountsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(planPaymentAccountsResetState());
    },
  };
};

export default connect(
  StudentPlanPaymentAccountContainer,
  mapStateToProps,
  mapDispatchToProps
);
