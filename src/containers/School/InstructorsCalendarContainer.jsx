import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolInstructorsCalendarFetch,
  schoolInstructorsCalendarResetState,
} from 'src/redux/actionCreators/school/instructorsCalendar';

const payloadDisplayName = 'School Contact Calendar';

class InstructorsCalendarContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        noRefreshOnUpdate={true}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.instructorsCalendar,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(schoolInstructorsCalendarFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolInstructorsCalendarResetState());
    },
  };
};

export default connect(
  InstructorsCalendarContainer,
  mapStateToProps,
  mapDispatchToProps
);
