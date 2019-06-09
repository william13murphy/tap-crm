import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolInstructorCalendarFetch,
  schoolInstructorCalendarResetState,
} from 'src/redux/actionCreators/school/instructorCalendar';

const payloadDisplayName = 'School Contact Calendar';

class InstructorCalendarContainer extends React.Component {
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
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.instructorCalendar,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(schoolInstructorCalendarFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolInstructorCalendarResetState());
    },
  };
};

export default connect(
  InstructorCalendarContainer,
  mapStateToProps,
  mapDispatchToProps
);
