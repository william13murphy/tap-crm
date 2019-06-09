import React from 'react';
import connect from 'src/redux/connect';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import StudentPlanStudentsContainer from 'containers/Student/StudentPlanStudentsContainer';
import ReadOnlyScreen from '../../ReadOnlyScreen';
import MembersList from './MembersList';
import './styles.less';

type MembersSectionProps = {
  match: { params: { schoolId: string } },
  studentPackageDetail: {
    payload: {
      Id: string,
    },
  },
};

const MembersSection = (props: MembersSectionProps) => {
  const schoolId = props.match.params.schoolId;
  const studentPlan = props.studentPlanDetail.payload;
  return (
    <div className="MembersSection">
      <ReadOnlyScreen readOnly={props.readOnly} />
      <div className="StudentPlanMembersSection">
        <SchoolStylesContainer dispatchFetchParams={schoolId}>
          <StudentPlanStudentsContainer
            dispatchFetchParams={studentPlan.PlanId}
          >
            <MembersList studentPlanId={studentPlan.PlanId} />
          </StudentPlanStudentsContainer>
        </SchoolStylesContainer>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentPlanDetail: state.student.planDetail,
  };
};

export default connect(
  MembersSection,
  mapStateToProps
);
