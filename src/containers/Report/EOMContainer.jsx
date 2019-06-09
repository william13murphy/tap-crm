import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import { eomFetch, eomResetState } from 'src/redux/actionCreators/report/eom';

const alwaysFetch = true;
const payloadDisplayName = 'EOM';

class EOMContainer extends React.Component {
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
    data: state.report.eom,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(eomFetch(id));
    },
    dispatchResetState: () => {
      dispatch(eomResetState());
    },
  };
};

export default connect(
  EOMContainer,
  mapStateToProps,
  mapDispatchToProps
);
