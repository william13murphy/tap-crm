import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  noShowFetch,
  noShowResetState,
} from 'src/redux/actionCreators/report/noShow';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class NoShowContainer extends React.Component {
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
    data: state.report.noShow,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(noShowFetch(id));
    },
    dispatchResetState: () => {
      dispatch(noShowResetState());
    },
  };
};

export default connect(
  NoShowContainer,
  mapStateToProps,
  mapDispatchToProps
);
