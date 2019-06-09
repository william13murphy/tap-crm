import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import billingByDate from './billingByDate';
import declineByDate from './declineByDate';
import studentPaymentHistory from './studentPaymentHistory';
import enrollmentByProgram from './enrollmentByProgram';
import attendanceByProgram from './attendanceByProgram';
import cumulativeAttendance from './cumulativeAttendance';
import inquiryBySource from './inquiryBySource';
import noShow from './noShow';
import newEnrollmentByProgram from './newEnrollmentByProgram';
import studentCount from './studentCount';
import studentUnpaid from './studentUnpaid';
import efcStudentUnpaid from './efcStudentUnpaid';
import efcStudentUnpaidByUserId from './efcStudentUnpaidByUserId';
import studentLocation from './studentLocation';
import leadByStatus from './leadByStatus';
import revenueByProgram from './revenueByProgram';
import revenueBySource from './revenueBySource';
import progressionException from './progressionException';
import revenueByPackage from './revenueByPackage';
import marketingLead from './marketingLead';
import attendanceByStyleByDate from './attendanceByStyleByDate';
import attendanceByStyleByDateReport from './attendanceByStyleByDateReport';
import perfectAttendanceByStyleByDate from './perfectAttendanceByStyleByDate';
import perfectAttendanceByStyleByDateReport from './perfectAttendanceByStyleByDateReport';
import schoolBirthday from './schoolBirthday';
import studentsBirthday from './studentsBirthday';
import financeDeductions from './financeDeductions';
import financeDisbursements from './financeDisbursements';
import schoolHealth from './schoolHealth';
import healthStats from './healthStats';
import eom from './eom';
import eomExcel from './eomExcel';
import eomByMonthByYear from './eomByMonthByYear';
import softExit from './softExit';
import renewal from './renewal';

export const reportInitialState = {
  billingByDate: Object.assign({}, emptyFetchState),
  declineByDate: Object.assign({}, emptyFetchState),
  studentPaymentHistory: Object.assign({}, emptyFetchState),
  enrollmentByProgram: Object.assign({}, emptyFetchState),
  newEnrollmentByProgram: Object.assign({}, emptyFetchState),
  attendanceByProgram: Object.assign({}, emptyFetchState),
  cumulativeAttendance: Object.assign({}, emptyFetchState),
  inquiryBySource: Object.assign({}, emptyFetchState),
  noShow: Object.assign({}, emptyFetchState),
  leadByStatus: Object.assign({}, emptyFetchState),
  revenueByProgram: Object.assign({}, emptyFetchState),
  revenueBySource: Object.assign({}, emptyFetchState),
  progressionException: Object.assign({}, emptyFetchState),
  revenueByPackage: Object.assign({}, emptyFetchState),
  marketingLead: Object.assign({}, emptyFetchState),
  studentCount: Object.assign({}, emptyFetchState),
  studentUnpaid: Object.assign({}, emptyFetchState),
  efcStudentUnpaid: Object.assign({}, emptyFetchState),
  efcStudentUnpaidByUserId: Object.assign({}, emptyFetchState),
  studentLocation: Object.assign({}, emptyFetchState),
  attendanceByStyleByDate: Object.assign({}, emptyFormState),
  attendanceByStyleByDateReport: Object.assign({}, emptyFetchState),
  perfectAttendanceByStyleByDate: Object.assign({}, emptyFetchState),
  perfectAttendanceByStyleByDateReport: Object.assign({}, emptyFetchState),
  schoolBirthday: Object.assign({}, emptyFetchState),
  studentsBirthday: Object.assign({}, emptyFetchState),
  financeDeductions: Object.assign({}, emptyFetchState),
  financeDisbursements: Object.assign({}, emptyFetchState),
  schoolHealth: Object.assign({}, emptyFetchState),
  eom: Object.assign({}, emptyFetchState),
  healthStats: {},
  eomExcel: Object.assign({}, emptyFetchState),
  eomByMonthByYear: Object.assign({}, emptyFetchState),
  softExit: Object.assign({}, emptyFetchState),
  renewal: Object.assign({}, emptyFetchState),
};

export function reportReducer(state, action) {
  return {
    billingByDate: billingByDate(state.billingByDate, action),
    declineByDate: declineByDate(state.declineByDate, action),
    studentPaymentHistory: studentPaymentHistory(
      state.studentPaymentHistory,
      action
    ),
    enrollmentByProgram: enrollmentByProgram(state.enrollmentByProgram, action),
    attendanceByProgram: attendanceByProgram(state.attendanceByProgram, action),
    cumulativeAttendance: cumulativeAttendance(
      state.cumulativeAttendance,
      action
    ),
    inquiryBySource: inquiryBySource(state.inquiryBySource, action),
    noShow: noShow(state.noShow, action),
    newEnrollmentByProgram: newEnrollmentByProgram(
      state.newEnrollmentByProgram,
      action
    ),
    studentCount: studentCount(state.studentCount, action),
    studentUnpaid: studentUnpaid(state.studentUnpaid, action),
    efcStudentUnpaid: efcStudentUnpaid(state.efcStudentUnpaid, action),
    efcStudentUnpaidByUserId: efcStudentUnpaidByUserId(
      state.efcStudentUnpaidByUserId,
      action
    ),
    studentLocation: studentLocation(state.studentLocation, action),
    leadByStatus: leadByStatus(state.leadByStatus, action),
    revenueByProgram: revenueByProgram(state.revenueByProgram, action),
    revenueBySource: revenueBySource(state.revenueBySource, action),
    progressionException: progressionException(
      state.progressionException,
      action
    ),
    revenueByPackage: revenueByPackage(state.revenueByPackage, action),
    marketingLead: marketingLead(state.marketingLead, action),
    attendanceByStyleByDate: attendanceByStyleByDate(
      state.attendanceByStyleByDate,
      action
    ),
    attendanceByStyleByDateReport: attendanceByStyleByDateReport(
      state.attendanceByStyleByDateReport,
      action
    ),
    perfectAttendanceByStyleByDate: perfectAttendanceByStyleByDate(
      state.perfectAttendanceByStyleByDate,
      action
    ),
    perfectAttendanceByStyleByDateReport: perfectAttendanceByStyleByDateReport(
      state.perfectAttendanceByStyleByDateReport,
      action
    ),
    schoolBirthday: schoolBirthday(state.schoolBirthday, action),
    studentsBirthday: studentsBirthday(state.studentsBirthday, action),
    financeDeductions: financeDeductions(state.financeDeductions, action),
    financeDisbursements: financeDisbursements(
      state.financeDisbursements,
      action
    ),
    schoolHealth: schoolHealth(state.schoolHealth, action),
    healthStats: healthStats(state.healthStats, action),
    eom: eom(state.eom, action),
    eomExcel: eomExcel(state.eomExcel, action),
    eomByMonthByYear: eomByMonthByYear(state.eomByMonthByYear, action),
    softExit: softExit(state.softExit, action),
    renewal: renewal(state.renewal, action),
  };
}
