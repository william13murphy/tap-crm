import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  leadByStatusFetch,
  leadByStatusResetState,
} from 'src/redux/actionCreators/report/leadByStatus';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class LeadByStatusContainer extends React.Component {
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
    data: state.report.leadByStatus,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(leadByStatusFetch(id));
    },
    dispatchResetState: () => {
      dispatch(leadByStatusResetState());
    },
  };
};

export default connect(
  LeadByStatusContainer,
  mapStateToProps,
  mapDispatchToProps
);
