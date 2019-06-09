import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolContactCalendarFetch,
  schoolContactCalendarResetState,
} from 'src/redux/actionCreators/school/contactCalendar';

const payloadDisplayName = 'School Contact Calendar';

class SchoolContactCalendarContainer extends React.Component {
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
    data: state.school.contactCalendar,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(schoolContactCalendarFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolContactCalendarResetState());
    },
  };
};

export default connect(
  SchoolContactCalendarContainer,
  mapStateToProps,
  mapDispatchToProps
);
