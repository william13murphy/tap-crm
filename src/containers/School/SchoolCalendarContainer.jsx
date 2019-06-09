import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolCalendarFetch,
  schoolCalendarResetState,
} from 'src/redux/actionCreators/school/calendar';

const payloadDisplayName = 'School Calendar';

class SchoolCalendarContainer extends React.Component {
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
    data: state.school.calendar,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(schoolCalendarFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolCalendarResetState());
    },
  };
};

export default connect(
  SchoolCalendarContainer,
  mapStateToProps,
  mapDispatchToProps
);
