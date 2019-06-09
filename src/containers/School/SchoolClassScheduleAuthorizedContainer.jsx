import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClassScheduleAuthorizedFetch,
  schoolClassScheduleAuthorizedResetState,
} from 'src/redux/actionCreators/school/classScheduleAuthorized';

const payloadDisplayName = 'Students in Class';

class SchoolClassScheduleAuthorizedContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: any,
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
    data: state.school.classScheduleAuthorized,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolClassScheduleAuthorizedFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClassScheduleAuthorizedResetState());
    },
  };
};

export default connect(
  SchoolClassScheduleAuthorizedContainer,
  mapStateToProps,
  mapDispatchToProps
);
