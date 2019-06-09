import moment from 'moment-timezone';
import { getReferenceItemOptions } from 'api/referenceItems';

// TEMPORARY Function to convert timezone values to names as in moment-timezone:
export const getTimeZoneNameFromValue = timeZoneValue => {
  // console.log('%cTIMEZONEVALUE', 'background: red', timeZoneValue);
  if (
    timeZoneValue === 'America/Anchorage' ||
    timeZoneValue === 'America/Los_Angeles' ||
    timeZoneValue === 'America/Boise' ||
    timeZoneValue === 'America/North_Dakota/Center' ||
    timeZoneValue === 'America/New_York' ||
    timeZoneValue === 'Europe/London' ||
    timeZoneValue === 'Indian/Christmas' ||
    timeZoneValue === 'Australia/Perth' ||
    timeZoneValue === 'Australia/Brisbane' ||
    timeZoneValue === 'Australia/Adelaide' ||
    timeZoneValue === 'Pacific/Norfolk' ||
    timeZoneValue === 'Pacific/Auckland'
  ) {
    return timeZoneValue;
  }

  if (timeZoneValue === '-09:00:00') {
    return 'America/Anchorage';
  } else if (timeZoneValue === '-08:00:00') {
    return 'America/Los_Angeles';
  } else if (timeZoneValue === '-07:00:00') {
    return 'America/Boise';
  } else if (timeZoneValue === '-06:00:00') {
    return 'America/North_Dakota/Center';
  } else if (timeZoneValue === '-05:00:00') {
    return 'America/New_York';
  } else if (timeZoneValue === '00:00:00') {
    return 'Europe/London';
  } else if (timeZoneValue === '07:00:00') {
    return 'Indian/Christmas';
  } else if (timeZoneValue === '08:00:00') {
    return 'Australia/Perth';
  } else if (timeZoneValue === '10:00:00') {
    return 'Australia/Brisbane';
  } else if (timeZoneValue === '10:30:00') {
    return 'Australia/Adelaide';
  } else if (timeZoneValue === '11:00:00') {
    return 'Pacific/Norfolk';
  } else if (timeZoneValue === '13:00:00') {
    return 'Pacific/Auckland';
  } else {
    // Return a default value in case the number does not match any of the above.
    return 'America/New_York';
  }
};

// getTimeZoneLabel: pass in state.utility.references and state.school.profile.payload.TimeZoneId,
// and it returns the current school's timezone:

export const getTimeZoneLabel = (references, timeZoneId) => {
  let timeZoneTypes = getReferenceItemOptions('LstTimeZones', references);

  let currentTimeZone = timeZoneTypes.filter(item => {
    return item.value === timeZoneId;
  });

  let schoolTimeZone =
    currentTimeZone && currentTimeZone[0] && currentTimeZone[0].label;

  return schoolTimeZone;
};

// localMoment: Pass in a timeZone and get the local dateTime for that region.
export const localMoment = timeZoneNameOrValue => {
  // TEMPORARY workaround to use timezone values instead of names:
  let timeZoneName = getTimeZoneNameFromValue(timeZoneNameOrValue);

  let currentTimeClean = convertMomentToCleanDate(moment());
  let localMomentDateTime = getLocalDateTime(timeZoneName, currentTimeClean);

  return localMomentDateTime;
};

//getLocalDateTime is only used in the above, localMoment()
export const getLocalDateTime = (timeZone, utcDateTime) => {
  let time = moment.duration(timeZone);

  var localDateTime = moment.utc(utcDateTime).add(time);

  return localDateTime;
};

// Accepts a moment, and converts to a Javascript Date, while removing the system time offset:
export const convertMomentToCleanDate = momentDate => {
  let dirtyDate = momentDate.toDate();
  let systemOffset = dirtyDate.getTimezoneOffset() * 60000;
  let cleanDate = moment
    .utc(dirtyDate)
    .add(systemOffset)
    .toDate();
  return cleanDate;
};

// Merge date string (with or without T00:00:00 time attached) and time strings into a single dateTime string:
export const mergeDateTime = (date, time) => {
  let timeAsMs = moment.duration(time).asMilliseconds();
  let dateTime = moment.utc(date).add(timeAsMs);
  return dateTime;
};

/*
 * getMomentLocalDateTime & getMomentUTCDateTime
 * Convert times between UTC and Local time, using moment-timezone.
 * Timezone will be a moment timezone string ('America/New_York') instead of a value ('-05:00:00')
 */

// Timezone will be a moment timezone string ('America/New_York') instead of a value ('-05:00:00')
export const getMomentLocalDateTime = (timeZoneNameOrValue, utcDateTime) => {
  // TEMPORARY workaround to use timezone values instead of names:
  let timeZoneName = getTimeZoneNameFromValue(timeZoneNameOrValue);

  var utcDateMoment = moment.utc(utcDateTime);
  var utcParsedOffset = moment.tz.zone(timeZoneName).parse(utcDateMoment);
  var localDateTimeFinal = utcDateMoment.subtract(utcParsedOffset, 'minutes');
  return localDateTimeFinal;
};

export const getMomentUTCDateTime = (timeZoneNameOrValue, localDateTime) => {
  // TEMPORARY workaround to use timezone values instead of names:
  let timeZoneName = getTimeZoneNameFromValue(timeZoneNameOrValue);
  var utcDateMoment = moment.utc(localDateTime);
  var utcOffset = moment.tz.zone(timeZoneName).utcOffset(localDateTime);
  var localDateTimeFinal = utcDateMoment.add(utcOffset, 'minutes');
  return localDateTimeFinal;
};

// Pass in a timezone, date, & time parameter, then return a localized datetime object:
export const calculateLocalDateTimeFromUTCDateAndTime = (
  timeZone,
  dateUTC,
  timeUTC
) => {
  // Merge date & time, to ensure the start date utc -> local conversion is correct:
  let dateTimeUTC = mergeDateTime(dateUTC, timeUTC);

  // Convert UTC Date to Local Date
  let localDateTime = getMomentLocalDateTime(timeZone, dateTimeUTC);

  return localDateTime;
};

// Pass in a timezone, local date, & time parameter, then return a UTC datetime object:
export const calculateUTCDateTimeFromLocalDateAndTime = (
  timeZone,
  dateLocal,
  timeLocal
) => {
  let dateTimeLocal = mergeDateTime(dateLocal, timeLocal);

  let UTCDateTime = getMomentUTCDateTime(timeZone, dateTimeLocal);

  return UTCDateTime;
};
