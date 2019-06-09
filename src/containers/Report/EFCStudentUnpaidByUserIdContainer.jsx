import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  efcStudentUnpaidByUserIdFetch,
  efcStudentUnpaidByUserIdResetState,
} from 'src/redux/actionCreators/report/efcStudentUnpaidByUserId';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class EFCStudentUnpaidByUserIdContainer extends React.Component {
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
    data: state.report.efcStudentUnpaidByUserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcStudentUnpaidByUserIdFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcStudentUnpaidByUserIdResetState());
    },
  };
};

export default connect(
  EFCStudentUnpaidByUserIdContainer,
  mapStateToProps,
  mapDispatchToProps
);
