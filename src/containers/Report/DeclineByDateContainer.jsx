import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  declineByDateFetch,
  declineByDateResetState,
} from 'src/redux/actionCreators/report/declineByDate';

const payloadDisplayName = 'Report';

class DeclineByDateContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: any,
    dispatchActionOnClose: any,
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
    data: state.report.declineByDate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(declineByDateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(declineByDateResetState());
    },
  };
};

export default connect(
  DeclineByDateContainer,
  mapStateToProps,
  mapDispatchToProps
);
