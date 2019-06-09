import React from 'react';
import connect from 'src/redux/connect';

type StudentWaiverDisplayProps = {
  studentWaiverGenerateMany: string,
};

const StudentWaiverDisplay = props => {
  return (
    <div className="StudentWaiverDisplay">
      <div
        dangerouslySetInnerHTML={{
          __html: props.studentWaiverGenerateMany.payload[props.studentId],
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentWaiverGenerateMany: state.student.waiverGenerateMany,
  };
};

export default connect(
  StudentWaiverDisplay,
  mapStateToProps
);
