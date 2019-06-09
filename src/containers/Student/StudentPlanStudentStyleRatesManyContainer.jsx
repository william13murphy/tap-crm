import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import { studentPlanStudentStyleRatesManyFetch } from 'src/redux/actionCreators/student/planStudentStyleRatesMany';

const payloadDisplayName = 'Student Programs and Rates';

class StudentPlanStudentStyleRatesManyContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string, // planStudentId
    options?: {},
  };
  render() {
    return (
      <GenericManyFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.planStudentStyleRatesMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (planStudentId: string) => {
      dispatch(studentPlanStudentStyleRatesManyFetch(planStudentId));
    },
  };
};

export default connect(
  StudentPlanStudentStyleRatesManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
