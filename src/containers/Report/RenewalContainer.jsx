import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  renewalFetch,
  renewalResetState,
} from 'src/redux/actionCreators/report/renewal';

const payloadDisplayName = 'Renewal Report';

class RenewalContainer extends React.Component {
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
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.renewal,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(renewalFetch(id));
    },
    dispatchResetState: () => {
      dispatch(renewalResetState());
    },
  };
};

export default connect(
  RenewalContainer,
  mapStateToProps,
  mapDispatchToProps
);
