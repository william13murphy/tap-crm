import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  schoolHealthFetch,
  schoolHealthResetState,
} from 'src/redux/actionCreators/report/schoolHealth';

import { fetchStat } from 'src/redux/actionCreators/report/healthStats';

const payloadDisplayName = 'Report';



class SchoolHealthContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: any,
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
    data: state.report.schoolHealth,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolHealthFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolHealthResetState());
    },
    fetchStat: (id, statType) => {
      dispatch(fetchStat({id,statType}));
    }
    // dispatchActionOnClose: () => {
    //   dispatch(schoolHealthReset());
    // },
  };
};

export default connect(
  SchoolHealthContainer,
  mapStateToProps,
  mapDispatchToProps
);
