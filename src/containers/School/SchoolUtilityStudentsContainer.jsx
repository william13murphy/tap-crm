import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolUtilityStudentsFetch,
  schoolUtilityStudentsResetState,
} from 'src/redux/actionCreators/school/utilityStudents';

const payloadDisplayName = 'School Students';

class SchoolUtilityStudentsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    alwaysFetch: boolean,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
        alwaysFetch={true}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.utilityStudents,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolUtilityStudentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolUtilityStudentsResetState());
    },
  };
};

export default connect(
  SchoolUtilityStudentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
