import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClassScheduleProgressionFetch,
  schoolClassScheduleProgressionResetState,
} from 'src/redux/actionCreators/school/classScheduleProgression';

const payloadDisplayName = 'Students in Class';

class SchoolClassScheduleProgressionContainer extends React.Component {
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
    data: state.school.classScheduleProgression,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolClassScheduleProgressionFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClassScheduleProgressionResetState());
    },
  };
};

export default connect(
  SchoolClassScheduleProgressionContainer,
  mapStateToProps,
  mapDispatchToProps
);
