import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  studentPaymentHistoryFetch,
  studentPaymentHistoryResetState,
} from 'src/redux/actionCreators/report/studentPaymentHistory';

const payloadDisplayName = 'Report';

class StudentPaymentHistoryContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: any, // StudentId
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.studentPaymentHistory,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentPaymentHistoryFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPaymentHistoryResetState());
    },
  };
};

export default connect(
  StudentPaymentHistoryContainer,
  mapStateToProps,
  mapDispatchToProps
);
