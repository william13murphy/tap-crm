import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanSummaryPdfFetch,
  studentPlanSummaryPdfResetState,
} from 'src/redux/actionCreators/student/planSummaryPdf';

const payloadDisplayName = 'Student Plan Summary PDF';

class StudentPlanSummaryPdfContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string, // planStudentId
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
    data: state.student.planSummaryPdf,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlanSummaryPdfFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanSummaryPdfResetState());
    },
  };
};

export default connect(
  StudentPlanSummaryPdfContainer,
  mapStateToProps,
  mapDispatchToProps
);
