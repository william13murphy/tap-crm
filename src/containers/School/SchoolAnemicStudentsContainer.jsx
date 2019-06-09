import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  anemicStudentsFetch,
  studentsResetState,
} from 'src/redux/actionCreators/school/anemicStudents';

const payloadDisplayName = 'Students';

class SchoolAnemicStudentsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    token: Array,
    dispatchFetch: any,
    dispatchFetchParams: string,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.anemicStudents,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(anemicStudentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentsResetState());
    },
  };
};

export default connect(
  SchoolAnemicStudentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
