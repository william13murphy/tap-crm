import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentProgressionsByStyleFetch,
  studentProgressionsByStyleResetState,
} from 'src/redux/actionCreators/student/progressionsByStyle';

const payloadDisplayName = 'Student Progressions';

class StudentProgressionsByStyleContainer extends React.Component {
  props: {
    params: {
      studentId: string,
      schoolId: string,
      schoolStyleId: string,
    },
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
    data: state.student.progressionsByStyle,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentProgressionsByStyleFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentProgressionsByStyleResetState());
    },
  };
};

export default connect(
  StudentProgressionsByStyleContainer,
  mapStateToProps,
  mapDispatchToProps
);
