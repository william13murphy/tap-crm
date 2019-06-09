import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClassScheduleStudentsFetch,
  schoolClassScheduleStudentsResetState,
} from 'src/redux/actionCreators/school/classScheduleStudents';

const payloadDisplayName = 'Students in Class';

class SchoolClassScheduleStudentsContainer extends React.Component {
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
    data: state.school.classScheduleStudents,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolClassScheduleStudentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClassScheduleStudentsResetState());
    },
  };
};

export default connect(
  SchoolClassScheduleStudentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
