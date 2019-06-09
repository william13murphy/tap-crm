import React from 'react';
import connect from 'src/redux/connect';
import DataCard from 'components/DataCard';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import StudentProgressionSummaryContainer from 'containers/Student/StudentProgressionSummaryContainer';

import CurrentRankGrid from './CurrentRankGrid';
import './styles.less';

type GradingSummaryProps = {
  progressionSummary: {
    payload: {
      Progressions: [{}],
    },
  },
  studentDetail: { payload: { Id: string, SchoolId: string } },
};

const GradingSummary = (props: GradingSummaryProps) => {
  const studentId =
    props.studentDetail &&
    props.studentDetail.payload &&
    props.studentDetail.payload.Id;
  const schoolId =
    props.studentDetail &&
    props.studentDetail.payload &&
    props.studentDetail.payload.SchoolId;
  return (
    <DataCard className="GradingSummary" title="Grading Summary">
      <StudentProgressionSummaryContainer dispatchFetchParams={studentId}>
        <CurrentRankGrid
          schoolId={schoolId}
          studentId={studentId}
          data={
            props.progressionSummary &&
            props.progressionSummary.payload &&
            props.progressionSummary.payload.Progressions
          }
          backUrl={props.backUrl}
        />
      </StudentProgressionSummaryContainer>
    </DataCard>
  );
};

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
    studentStylerank: state.student.stylerank,
    progressionsByStyleMany: state.student.progressionsByStyleMany,
    progressionSummary: state.student.progressionSummary,
  };
};

export default connect(
  GradingSummary,
  mapStateToProps
);
