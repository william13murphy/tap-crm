import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  studentCountFetch,
  studentCountResetState,
} from 'src/redux/actionCreators/report/studentCount';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class StudentCountContainer extends React.Component {
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
    data: state.report.studentCount,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentCountFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentCountResetState());
    },
  };
};

export default connect(
  StudentCountContainer,
  mapStateToProps,
  mapDispatchToProps
);
