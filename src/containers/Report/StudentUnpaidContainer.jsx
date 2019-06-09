import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  studentUnpaidFetch,
  studentUnpaidResetState,
} from 'src/redux/actionCreators/report/studentUnpaid';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class StudentUnpaidContainer extends React.Component {
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
    data: state.report.studentUnpaid,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentUnpaidFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentUnpaidResetState());
    },
  };
};

export default connect(
  StudentUnpaidContainer,
  mapStateToProps,
  mapDispatchToProps
);
