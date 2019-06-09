import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStudentPlansFetch,
  schoolStudentPlansResetState,
} from 'src/redux/actionCreators/school/studentPlans';

const payloadDisplayName = 'School Plans';

type SchoolStudentPlansContainerProps = {
  children: any,
  data: Array<{}> | {} | null,
  dispatchFetch: any,
  dispatchFetchParams: string,
  schoolId: any,
  options?: {},
};

class SchoolStudentPlansContainer extends React.Component {
  props: SchoolStudentPlansContainerProps;
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
    data: state.school.studentPlans,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStudentPlansFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStudentPlansResetState());
    },
  };
};

export default connect(
  SchoolStudentPlansContainer,
  mapStateToProps,
  mapDispatchToProps
);
