import React from 'react';
import { Redirect } from 'react-router-dom';

const NewPlanRedirect = props => {
  // Create a new blank plan, or
  // If coming from StudentDetail, redirect to create new plan for that student.
  const redirectUrl = props.studentId
    ? `/app/school-app/${props.schoolId}/students/plans/detail/${
        props.studentPlanId
      }/students/enroll-student/${props.studentId}`
    : `/app/school-app/${props.schoolId}/students/plans/detail/${
        props.studentPlanId
      }`;

  return <Redirect to={redirectUrl} />;
};

export default NewPlanRedirect;
