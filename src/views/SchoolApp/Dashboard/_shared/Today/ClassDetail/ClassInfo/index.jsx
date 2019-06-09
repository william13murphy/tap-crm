import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'util/localization/timezone';

import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import './styles.less';

type ClassInfoProps = {
  classDetail: {
    payload: {},
  },
  classScheduleStudents: Array<{}>,
  utilityStaffs: Array<{}>,
  schoolId: string,
  classScheduleId: string,
};

const ClassInfo = (props: ClassInfoProps) => {
  let classDetail = props.classDetail.payload ? props.classDetail.payload : {};

  const classScheduleId = props.classScheduleId;

  const classSchedule = classDetail.Schedules.filter(cV => {
    return classScheduleId === cV.Id;
  })[0];

  let schoolTimeZone = getTimeZoneLabel(
    props.references,
    props.schoolProfile.payload.TimeZoneId
  );

  let localStartDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    schoolTimeZone,
    classDetail.StartDate,
    classDetail.StartTimeUtc
  );

  let localEndDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    schoolTimeZone,
    classDetail.StartDate,
    classDetail.EndTimeUtc
  );

  const classDate = moment(classSchedule.Date).format('MMMM D, YYYY');
  const localTimeStart = localStartDateTime.format('h:mm a');
  const localTimeEnd = localEndDateTime.format('h:mm a');

  let instructorInfo =
    props.utilityStaffs.payload &&
    props.utilityStaffs.payload.find(
      item => item.UserId === classDetail.Instructor
    );
  return (
    <div className="ClassInfo">
      <Link
        className="ClassDetailLink"
        to={`/app/school-app/${
          props.schoolId
        }/school-detail/classes/class-detail/${classDetail.Id}`}
      >
        <button className="pt-button">
          View Class Detail
          <i className="fa fa-chevron-right" />
        </button>
      </Link>
      <SchoolUtilityStaffsContainer dispatchFetchParams={props.schoolId}>
        <h4>
          <strong>Instructor: </strong>
          <Link
            to={`/app/school-app/${
              props.schoolId
            }/school-detail/staff/detail/${instructorInfo &&
              instructorInfo.SchoolContactId}`}
          >
            {instructorInfo && instructorInfo.Name}
          </Link>
        </h4>
        <h4>
          <strong>Date: </strong>
          {classDate}
        </h4>
        <h4>
          <strong>Time: </strong>
          {localTimeStart} &ndash; {localTimeEnd}
        </h4>
      </SchoolUtilityStaffsContainer>
    </div>
  );
};
const mapStateToProps = function(state) {
  return {
    classDetail: state.school.classDetail,
    classScheduleStudents: state.school.classScheduleStudents,
    utilityStaffs: state.school.utilityStaffs,
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

export default connect(
  ClassInfo,
  mapStateToProps
);
