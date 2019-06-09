import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClockInOutsFetch,
  schoolClockInOutsResetState,
} from 'src/redux/actionCreators/school/clockInOuts';

const payloadDisplayName = 'School ClockInOut';

class SchoolClockInOutsContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.school.clockInOuts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolClockInOutsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClockInOutsResetState());
    },
  };
};

export default connect(
  SchoolClockInOutsContainer,
  mapStateToProps,
  mapDispatchToProps
);
