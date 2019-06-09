import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import { studentPlanStudentStyleRateClassesManyFetch } from 'src/redux/actionCreators/student/planStudentStyleRateClassesMany';

const payloadDisplayName = 'Student Classes';

class StudentPlanStudentStyleRateClassesManyContainer extends React.Component {
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
    data: state.student.planStudentStyleRateClassesMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (planStudentStyleRateId: string) => {
      dispatch(
        studentPlanStudentStyleRateClassesManyFetch(planStudentStyleRateId)
      );
    },
  };
};

export default connect(
  StudentPlanStudentStyleRateClassesManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
