import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  studentLocationFetch,
  studentLocationResetState,
} from 'src/redux/actionCreators/report/studentLocation';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class StudentLocationContainer extends React.Component {
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
    data: state.report.studentLocation,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentLocationFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentLocationResetState());
    },
  };
};

export default connect(
  StudentLocationContainer,
  mapStateToProps,
  mapDispatchToProps
);
