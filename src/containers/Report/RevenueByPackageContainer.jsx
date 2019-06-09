import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  revenueByPackageFetch,
  revenueByPackageResetState,
} from 'src/redux/actionCreators/report/revenueByPackage';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class RevenueByPackageContainer extends React.Component {
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
    data: state.report.revenueByPackage,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(revenueByPackageFetch(id));
    },
    dispatchResetState: () => {
      dispatch(revenueByPackageResetState());
    },
  };
};

export default connect(
  RevenueByPackageContainer,
  mapStateToProps,
  mapDispatchToProps
);
