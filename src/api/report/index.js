import { apiDomain, getData, postData, putData, getBlobData } from '../_base';

export function getBillingByDate(id: string) {
  const url = apiDomain + '/api/report/billing/bydate/' + id;
  return getData(url);
}

export function getDeclineByDate(id: string) {
  const url = apiDomain + '/api/report/decline/bydate/' + id;
  return getData(url);
}

export function getStudentPaymentHistory(studentId: string) {
  const url = apiDomain + '/api/report/finance/paymenthistory/' + studentId;
  return getData(url);
}

export function getStudentEnrollmentByProgram(id: string) {
  const url = apiDomain + '/api/report/student/enrollmentbystyle/' + id;
  return getData(url);
}

export function getStudentAttendanceByProgram(id: string) {
  const url = apiDomain + '/api/report/student/attendancebystyle/' + id;
  return getData(url);
}

export function getStudentCumulativeAttendance(id: string) {
  const url = apiDomain + '/api/report/student/cummulativeattendance/' + id;
  return getData(url);
}

export function getEfcStudentUnpaid() {
  const url = apiDomain + '/api/report/efc/student/unpaid';
  return getData(url);
}

export function getEfcStudentUnpaidByUserId(userId: string) {
  const url = apiDomain + '/api/report/efc/student/unpaid/' + userId;
  return getData(url);
}

export function getStudentUnpaid(schoolId: string) {
  const url = apiDomain + '/api/report/student/unpaid/' + schoolId;
  return getData(url);
}

export function getNoShow(id: string) {
  const url = apiDomain + '/api/report/student/noshow/' + id;
  return getData(url);
}

export function getMarketingInquiryBySource(id: string) {
  const url = apiDomain + '/api/report/marketing/inquirybysource/' + id;
  return getData(url);
}

export function getMarketingLeadByStatus(id: string) {
  const url = apiDomain + '/api/report/marketing/leadbystatus/' + id;
  return getData(url);
}

export function getRevenueByProgram(id: string) {
  const url = apiDomain + '/api/report/revenue/bystyle/' + id;
  return getData(url);
}
export function getRevenueBySource(id: string) {
  const url = apiDomain + '/api/report/revenue/bysource/' + id;
  return getData(url);
}

export function getStudentLocation(id: string) {
  const url = apiDomain + '/api/report/student/location/' + id;
  return getData(url);
}

export function getNewEnrollmentByProgram(id: string) {
  const url = apiDomain + '/api/report/student/newenrollmentbystyle/' + id;
  return getData(url);
}

export function getStudentCount(id: string) {
  const url = apiDomain + '/api/report/student/count/' + id;
  return getData(url);
}

export function getProgressionException(id: string) {
  const url = apiDomain + '/api/report/student/progressionexception/' + id;
  return getData(url);
}

export function getRevenueByPackage(id: string) {
  const url = apiDomain + '/api/report/revenue/bypackage/' + id;
  return getData(url);
}

export function getMarketingLead(id: string) {
  const url = apiDomain + '/api/report/marketing/lead/' + id;
  return getData(url);
}
export function postAttendanceByStyleByDate(data: {}) {
  const url = apiDomain + '/api/report/student/attendancebystylebydate';
  return postData(url, data);
}
export function postPerfectAttendanceByStyleByDate(data: {}) {
  const url = apiDomain + '/api/report/student/perfectattendancebystylebydate';
  return postData(url, data);
}
export function getSchoolBirthday(id: string) {
  const url = apiDomain + '/api/report/student/birthday/' + id;
  return getData(url);
}
export function getStudentsBirthdayReport(params: Object) {
  const url =
    apiDomain +
    '/api/report/student/studentsbirthdayreport/' +
    params.schoolId +
    '/' +
    params.days;
  return getData(url);
}
export function getFinanceDeductionsReport(id: string) {
  const url = apiDomain + '/api/report/finance/deductions/' + id;
  return getData(url);
}
export function getFinanceDisbursmentsReport(id: string) {
  const url = apiDomain + '/api/report/finance/disbursments/' + id;
  return getData(url);
}
export function postSchoolHealth(data: {}) {
  const url = apiDomain + '/api/report/school/health';
  const leads = getData(`${url}/leads?schoolId=${data.SchoolId}&startDate=${encodeURIComponent(data.StartDate)}`);
  const unpaids = getData(`${url}/unpaids?schoolId=${data.SchoolId}`);
  const upcomingGradings = getData(`${url}/upcomingGradings?schoolId=${data.SchoolId}`);
  const birthdays = getData(`${url}/birthdays?schoolId=${data.SchoolId}&days=30`);
  const softexits = getData(`${url}/softexits?schoolId=${data.SchoolId}`);
  const renewals = getData(`${url}/renewals?schoolId=${data.SchoolId}`);
  const messages = getData(`${url}/messages?schoolId=${data.SchoolId}`);

  // resolve all ajax calls and get response
  return Promise.all([leads, unpaids, upcomingGradings, birthdays, softexits, renewals, messages]).then((response) => {
      // compose response from ajax response args
      const data = {
        openLeads: response[0].openLeads,
        unpaids: response[1].unpaids,
        upcomingGradings: response[2].upcomingGradings.length,
        birthDays: response[3].value.length,
        softexits: response[4].softExits,
        renewals: response[5].renewals,
        flaggedMessages: response[6].flaggedMessages
      };
      return data;
    });
}
export function getEomReport(id: string) {
  const url = apiDomain + '/api/report/eom/' + id;
  return getData(url);
}
export function getEomByMonthByYearReport(params: Object) {
  const url =
    apiDomain +
    '/api/report/eom/' +
    params.SchoolId +
    '?monthId=' +
    params.Month +
    '&yearId=' +
    params.Year;
  return getData(url);
}
export function getEomExcelReport(id: string) {
  const url = apiDomain + '/api/report/eom/excel/' + id;
  return getBlobData(url);
}

export function getSoftExit(id: string) {
  const url = apiDomain + '/api/report/student/softexits/' + id;
  return getData(url);
}

export function getRenewal(id: string) {
  const url = apiDomain + '/api/report/student/renewals/' + id;
  return getData(url);
}
