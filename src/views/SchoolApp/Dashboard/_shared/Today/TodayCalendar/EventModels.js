import moment from 'moment';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  convertMomentToCleanDate,
} from 'src/util/localization/timezone';

const createClassEventModel = (item, timeZone) => {
  // Merge Time & Date, account for local time, and convert to Javascript date object for Calendar:
  let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    item.Date,
    item.Start
  );

  let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    item.Date,
    item.End
  );

  // Add a day if the end time is before the start time. This can happen sometimes
  // because the time is stored independently of the date in the back end.
  endDateTime = addDayIfEndBeforeStart(startDateTime, endDateTime);

  let start = convertMomentToCleanDate(startDateTime);
  let end = convertMomentToCleanDate(endDateTime);

  return {
    title: item.Style,
    start: start,
    end: end,
    classId: item.ClassId,
    classScheduleId: item.ClassScheduleId,
    type: 'Class',
  };
};

const createAppointmentEventModel = (item, timeZone) => {
  let startDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    item.StartDate,
    item.StartTimeUtc
  );

  let endDateTime = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    item.EndDate,
    item.EndTimeUtc
  );

  endDateTime = addDayIfEndBeforeStart(startDateTime, endDateTime);
  let start = convertMomentToCleanDate(startDateTime);
  let end = convertMomentToCleanDate(endDateTime);

  return {
    id: item.Id,
    title: item.Title,
    start: start,
    end: end,
    type: 'Appointment',
  };
};

const addDayIfEndBeforeStart = (startDateTime, endDateTime) => {
  let finalEndDateTime = endDateTime;

  if (endDateTime.isBefore(startDateTime)) {
    finalEndDateTime = endDateTime.add(1, 'days');
  }

  return finalEndDateTime;
};

export { createClassEventModel, createAppointmentEventModel };
