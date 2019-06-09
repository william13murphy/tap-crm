import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  newEnrollmentByProgramFetch,
  newEnrollmentByProgramResetState,
} from 'src/redux/actionCreators/report/newEnrollmentByProgram';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class NewEnrollmentByProgramContainer extends React.Component {
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
    data: state.report.newEnrollmentByProgram,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(newEnrollmentByProgramFetch(id));
    },
    dispatchResetState: () => {
      dispatch(newEnrollmentByProgramResetState());
    },
  };
};

export default connect(
  NewEnrollmentByProgramContainer,
  mapStateToProps,
  mapDispatchToProps
);
