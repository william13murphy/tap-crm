import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolInstructorsFetch,
  schoolInstructorsResetState,
} from 'src/redux/actionCreators/school/instructors';

const payloadDisplayName = 'School Instructors';

class SchoolInstructorsContainer extends React.Component {
  props: {
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
    data: state.school.instructors,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolInstructorsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolInstructorsResetState());
    },
  };
};

export default connect(
  SchoolInstructorsContainer,
  mapStateToProps,
  mapDispatchToProps
);
