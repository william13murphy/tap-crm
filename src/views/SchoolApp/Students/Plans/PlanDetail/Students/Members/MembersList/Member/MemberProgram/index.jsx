import React from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import DataCard from 'components/DataCard';

import StudentPlanStudentStyleRateDeleteContainer from 'containers/Student/StudentPlanStudentStyleRateDeleteContainer';
import ConfirmDialog from 'components/ConfirmDialog';

import SchoolStyleRateManyContainer from 'containers/School/SchoolStyleRateManyContainer';
import StyleRateDisplay from './StyleRateDisplay';

type MemberProgramProps = {
  currentUrl: string,
  planStudentId: string,
  planId: string,
  studentDetail: {},
  studentStyleRate: {},
};

const MemberProgram = props => {
  return (
    <div className="MemberProgram">
      <Route
        path={`${props.match.path}/${props.studentStyleRate.Id}/delete`}
        render={innerProps => (
          <Modal title="Delete Student Program" closeUrl={`${props.match.url}`}>
            <StudentPlanStudentStyleRateDeleteContainer
              dispatchActionOnCloseParams={props.studentStyleRate.PlanStudentId}
              redirectOnSuccess={`${props.match.url}`}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={`${props.match.url}`}
                id={props.studentStyleRate.Id}
              />
            </StudentPlanStudentStyleRateDeleteContainer>
          </Modal>
        )}
      />
      <DataCard
        className="MemberProgram__DataCard"
        title={props.studentStyleRate.SchoolStyleName}
        titleLink={`/app/school-app/${
          props.match.params.schoolId
        }/school-detail/programs/detail/${
          props.studentStyleRate.SchoolStyleId
        }/program`}
        deleteLink={`${props.match.url}/${props.studentStyleRate.Id}/delete`}
        deleteLinkText="Remove Program"
      >
        <table className="default-table-plain">
          <tbody>
            <tr>
              <td className="label">Initial Rank:</td>
              <td>{props.studentStyleRate.InitialStyleRankName}</td>
            </tr>
            <tr>
              <td className="label">Classes per Week:</td>
              <td>
                {props.studentStyleRate.DefaultClasses +
                  props.studentStyleRate.AdditionalClasses}
              </td>
            </tr>
          </tbody>
        </table>
        <SchoolStyleRateManyContainer
          dispatchFetchParams={props.studentStyleRate.StyleRateId}
        >
          <StyleRateDisplay
            planId={props.planId}
            planStudentId={props.planStudentId}
            studentDetail={props.studentDetail}
            studentStyleRate={props.studentStyleRate}
          />
        </SchoolStyleRateManyContainer>
      </DataCard>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  MemberProgram,
  mapStateToProps
);
