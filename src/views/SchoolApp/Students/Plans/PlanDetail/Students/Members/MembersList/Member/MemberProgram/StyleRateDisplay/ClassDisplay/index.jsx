import React from 'react';
import connect from 'src/redux/connect';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'util/localization/timezone';

type ClassDisplayProps = {
  timeZone: string,
  classDetail: {
    Name: string,
    FrequencyTypeId: string,
    StartTimeUtc: string,
    EndTimeUtc: string,
  },
  inline: boolean,
};

const ClassDisplay = (props: ClassDisplayProps) => {
  let schoolTimeZone = getTimeZoneLabel(
    props.references,
    props.schoolProfile.payload.TimeZoneId
  );

  let localStartDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    schoolTimeZone,
    props.classDetail.StartDate,
    props.classDetail.StartTimeUtc
  );

  let localEndDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    schoolTimeZone,
    props.classDetail.StartDate,
    props.classDetail.EndTimeUtc
  );

  const localTimeStart = localStartDateTime.format('h:mm a');
  const localTimeEnd = localEndDateTime.format('h:mm a');

  return (
    <div className="ClassDisplay">
      <div className={`${props.inline ? 'inline-block' : ''}`}>
        <strong>
          {props.classDetail.Name}
          {props.inline ? ': ' : ''}
        </strong>
      </div>
      <div className={`${props.inline ? 'inline-block' : ''}`}>
        <span>
          <ReferenceOutput
            listName="LstFrequencyTypes"
            id={props.classDetail.FrequencyTypeId}
          />
        </span>{' '}
        from{' '}
        <span>
          {localTimeStart} &ndash; {localTimeEnd}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  ClassDisplay,
  mapStateToProps
);
