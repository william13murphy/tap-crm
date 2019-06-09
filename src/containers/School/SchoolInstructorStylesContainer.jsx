import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolInstructorStylesFetch,
  schoolInstructorStylesResetState,
} from 'src/redux/actionCreators/school/instructorStyles';

const payloadDisplayName = 'School Instructor Styles';

class SchoolInstructorStylesContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
    data: state.school.instructorStyles,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolInstructorStylesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolInstructorStylesResetState());
    },
  };
};

export default connect(
  SchoolInstructorStylesContainer,
  mapStateToProps,
  mapDispatchToProps
);
