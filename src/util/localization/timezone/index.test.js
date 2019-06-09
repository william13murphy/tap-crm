import {
  mergeDateTime,
  getMomentLocalDateTime,
  getMomentUTCDateTime,
  calculateLocalDateTimeFromUTCDateAndTime,
  calculateUTCDateTimeFromLocalDateAndTime,
} from './index';

import moment from 'moment';

/*
 * mergeDateTime
 *
 */

test('test the mergeDateTime function with datetime & time', () => {
  let date = '2019-03-16T00:00:00';
  let time = '20:30:00';
  let result = mergeDateTime(date, time);
  result = result.format('YYYY-MM-DDTHH:mm:SS');
  expect(result).toBe('2019-03-16T20:30:00');
});

test('test the mergeDateTime function with date & time', () => {
  let date = '2019-03-16';
  let time = '20:30:00';
  let result = mergeDateTime(date, time);
  result = result.format('YYYY-MM-DDTHH:mm:SS');
  expect(result).toBe('2019-03-16T20:30:00');
});

/*
 * getMomentLocalDateTime
 *
 */

// Eastern Standard Time
test('test the getMomentLocalDateTime function (EST)', () => {
  let timeZoneName = 'America/New_York';
  let utcTime = moment.utc('2019-03-04T04:20:00');
  let result = getMomentLocalDateTime(timeZoneName, utcTime);
  result = result.toString();
  expect(result).toBe('Sun Mar 03 2019 23:20:00 GMT+0000');
});

// Eastern Daylight Time
test('test the getMomentLocalDateTime function (EDT)', () => {
  let timeZoneName = 'America/New_York';
  let utcTime = moment.utc('2019-04-01T04:20:00');
  let result = getMomentLocalDateTime(timeZoneName, utcTime);
  result = result.toString();
  expect(result).toBe('Mon Apr 01 2019 00:20:00 GMT+0000');
});

/*
 * getMomentUTCDateTime
 *
 */

// Eastern Standard Time
test('test the getMomentUTCDateTime function (EST)', () => {
  let timeZoneName = 'America/New_York';
  let localTime = moment.utc('2019-03-03T23:20:00');
  let result = getMomentUTCDateTime(timeZoneName, localTime);
  result = result.toString();
  expect(result).toBe('Mon Mar 04 2019 04:20:00 GMT+0000');
});

// Eastern Daylight Time
test('test the getMomentUTCDateTime function (EDT)', () => {
  let timeZoneName = 'America/New_York';
  let localTime = moment.utc('2019-04-01T00:20:00');
  let result = getMomentUTCDateTime(timeZoneName, localTime);
  result = result.toString();
  expect(result).toBe('Mon Apr 01 2019 04:20:00 GMT+0000');
});

/*
 * calculateLocalDateTimeFromUTCDateAndTime
 *
 */

test('test the calculateLocalDateTimeFromUTCDateAndTime function in Australia/Brisbane', () => {
  let timeZone = 'Australia/Brisbane';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '15:00:00';

  let result = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-20T01:00:00');
});

test('test the calculateLocalDateTimeFromUTCDateAndTime function in Pacific/Auckland', () => {
  let timeZone = 'Pacific/Auckland';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '15:00:00';

  let result = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-20T04:00:00');
});

test('test the calculateLocalDateTimeFromUTCDateAndTime function in Europe/London', () => {
  let timeZone = 'Europe/London';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '15:00:00';

  let result = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-19T15:00:00');
});

test('test the calculateLocalDateTimeFromUTCDateAndTime function in America/New_York', () => {
  let timeZone = 'America/New_York';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '03:00:00';

  let result = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-18T23:00:00');
});

/*
 * calculateUTCDateTimeFromLocalDateAndTime
 *
 */

test('test the calculateUTCDateTimeFromLocalDateAndTime function in Australia/Brisbane', () => {
  let timeZone = 'Australia/Brisbane';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '01:00:00';

  let result = calculateUTCDateTimeFromLocalDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-18T15:00:00');
});

test('test the calculateUTCDateTimeFromLocalDateAndTime function in Pacific/Auckland', () => {
  let timeZone = 'Pacific/Auckland';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '04:00:00';

  let result = calculateUTCDateTimeFromLocalDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-18T15:00:00');
});

test('test the calculateLocalDateTimeFromUTCDateAndTime function in Europe/London', () => {
  let timeZone = 'Europe/London';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '15:00:00';

  let result = calculateLocalDateTimeFromUTCDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-19T15:00:00');
});

test('test the calculateUTCDateTimeFromLocalDateAndTime function in America/New_York', () => {
  let timeZone = 'America/New_York';
  let UTCDateTime = '2019-03-19T00:00:00';
  let UTCTime = '23:00:00';

  let result = calculateUTCDateTimeFromLocalDateAndTime(
    timeZone,
    UTCDateTime,
    UTCTime
  );
  result = result.format('YYYY-MM-DDTHH:mm:SS');

  expect(result).toBe('2019-03-20T03:00:00');
});
