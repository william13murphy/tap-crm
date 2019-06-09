import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  efcStudentUnpaidFetch,
  efcStudentUnpaidResetState,
} from 'src/redux/actionCreators/report/efcStudentUnpaid';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class EFCStudentUnpaidContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.efcStudentUnpaid,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcStudentUnpaidFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcStudentUnpaidResetState());
    },
  };
};

export default connect(
  EFCStudentUnpaidContainer,
  mapStateToProps,
  mapDispatchToProps
);
