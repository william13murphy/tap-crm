import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClockInOutFetch,
  schoolClockInOutResetState,
} from 'src/redux/actionCreators/school/clockInOut';

const payloadDisplayName = 'School ClockInOut';

class SchoolClockInOutContainer extends React.Component {
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
    data: state.school.clockInOut,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolClockInOutFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClockInOutResetState());
    },
  };
};

export default connect(
  SchoolClockInOutContainer,
  mapStateToProps,
  mapDispatchToProps
);
