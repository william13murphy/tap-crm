import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  softExitFetch,
  softExitResetState,
} from 'src/redux/actionCreators/report/softExit';

const payloadDisplayName = 'Soft Exit Report';

class SoftExitContainer extends React.Component {
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
    data: state.report.softExit,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(softExitFetch(id));
    },
    dispatchResetState: () => {
      dispatch(softExitResetState());
    },
  };
};

export default connect(
  SoftExitContainer,
  mapStateToProps,
  mapDispatchToProps
);
