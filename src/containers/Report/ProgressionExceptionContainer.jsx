import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  progressionExceptionFetch,
  progressionExceptionResetState,
} from 'src/redux/actionCreators/report/progressionException';

const payloadDisplayName = 'Progression Report';

class ProgressionExceptionContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
    dispatchFetchParams: {
      schoolId: string,
    },
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
    data: state.report.progressionException,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(progressionExceptionFetch(id));
    },
    dispatchResetState: () => {
      dispatch(progressionExceptionResetState());
    },
  };
};

export default connect(
  ProgressionExceptionContainer,
  mapStateToProps,
  mapDispatchToProps
);
