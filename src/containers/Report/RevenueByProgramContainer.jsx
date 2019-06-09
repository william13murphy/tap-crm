import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  revenueByProgramFetch,
  revenueByProgramResetState,
} from 'src/redux/actionCreators/report/revenueByProgram';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class RevenueByProgramContainer extends React.Component {
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
    data: state.report.revenueByProgram,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(revenueByProgramFetch(id));
    },
    dispatchResetState: () => {
      dispatch(revenueByProgramResetState());
    },
  };
};

export default connect(
  RevenueByProgramContainer,
  mapStateToProps,
  mapDispatchToProps
);
