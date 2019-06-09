import {
  apiDomain,
  getData,
  postData,
  putData,
  getPdfBlobData,
  deleteData,
} from '../_base';

export function getStudentDetail(id: string) {
  const url = apiDomain + '/api/student/' + id;
  return getData(url);
}

export function createStudent(data: {}) {
  const url = apiDomain + '/api/student/create';
  return postData(url, data);
}

export function postStudentCSV(data: {}) {
  const url = apiDomain + '/api/student/import';
  return postData(url, data);
}

export function updateStudent(data: {}) {
  const url = apiDomain + '/api/student/update';
  return putData(url, data);
}

export function postStudentCalendar(data: {}) {
  const url = apiDomain + '/api/student/calendar';
  return postData(url, data);
}

export function getStudentWaiverGenerate(id: string) {
  const url = apiDomain + '/api/student/waiver/generate/' + id;
  return getData(url);
}

export function saveStudentWaiver(data: {}) {
  const url = apiDomain + '/api/student/waiver/save';
  return putData(url, data);
}

export function getStudentInstructor(id) {
  const url = apiDomain + '/api/student/instructor/' + id;
  return getData(url);
}

// getStudentPlanAnemicDetail: This endpoint replaced by getStudentPlanDetail, so have not yet created to redux/containers:
export function getStudentPlanAnemicDetail(id) {
  const url = apiDomain + '/api/student/plan/' + id;
  return getData(url);
}

export function getStudentPlanDetail(id) {
  const url = apiDomain + '/api/student/plan/detail/' + id;
  return getData(url);
}

export function putStudentPlanTerminate(planId) {
  const url = apiDomain + '/api/student/plan/terminate/' + planId;
  return putData(url);
}

export function getStudentPlans(schoolId) {
  const url = apiDomain + '/api/student/plans/' + schoolId;
  return getData(url);
}

export function getStudentPlanStudentDetail(planStudentId) {
  const url = apiDomain + '/api/student/planstudent/' + planStudentId;
  return getData(url);
}

export function getStudentPlanPayments(planId) {
  const url = apiDomain + '/api/student/plan/payments/' + planId;
  return putData(url);
}

export function getStudentPlanStudents(planId) {
  const url = apiDomain + '/api/student/planstudents/' + planId;
  return getData(url);
}

export function saveStudentPlanStudent(data: {}) {
  const url = apiDomain + '/api/student/planstudent/save';
  return postData(url, data);
}

export function deleteStudentPlanStudent(planStudentId) {
  const url = apiDomain + '/api/student/planstudent/delete/' + planStudentId;
  return putData(url);
}

export function updateStudentPlanPaymentSuspend({ planId, paymentId }) {
  const url = apiDomain + '/api/student/plan/schedule/suspend/' + planId + '/' + paymentId;
  return putData(url);
}

export function updateStudentPlanPaymentSettle({ planId, paymentId }) {
  const url =
    apiDomain + '/api/student/plan/schedule/settle/' + planId + '/' + paymentId;
  return putData(url);
}

export function updateStudentPlanPaymentRestore({ planId, paymentId }) {
  const url =
    apiDomain + '/api/student/plan/schedule/restore/' + planId + '/' + paymentId;
  return putData(url);
}

export function updateStudentPlanPaymentRefund({ planId, paymentId }) {
  const url =
    apiDomain + '/api/student/plan/schedule/refund/' + planId + '/' + paymentId;
  return putData(url);
}

export function updateStudentPlanPaymentUpdateStatus({
  planId,
  paymentId,
  status,
}) {
  // Status === "Restore" | "Refund" | "Retry"
  const url =
    apiDomain +
    '/api/student/plan/payment/updatestatus/' +
    planId +
    '/' +
    paymentId +
    '/' +
    status;
  return putData(url);
}

export function getStudentPlanStudentStyleRates(planStudentId) {
  const url = apiDomain + '/api/student/planstudentstylerates/' + planStudentId;
  return getData(url);
}

export function saveStudentPlanStudentStyleRate(data: {}) {
  const url = apiDomain + '/api/student/planstudentstylerate/save';
  return postData(url, data);
}

export function deleteStudentPlanStudentStyleRate(styleRateId) {
  const url =
    apiDomain + '/api/student/planstudentstylerate/delete/' + styleRateId;
  return putData(url);
}

export function getStudentPlanStudentStyleRateClasses(planStudentStyleRateId) {
  const url =
    apiDomain +
    '/api/student/planstudentstylerateclasses/' +
    planStudentStyleRateId;
  return getData(url);
}

export function saveStudentPlanStudentStyleRateClasses(data: {}) {
  const url = apiDomain + '/api/student/planstudentstylerateclasses/save';
  return postData(url, data);
}

// postStudentPlanEnrollment is a "post", but acts like a "get".
export function postStudentPlanEnrollment(schoolId) {
  const url = apiDomain + '/api/student/plan/enroll/' + schoolId;
  return postData(url);
}

export function putStudentPlanFinalize(id: string) {
  const url = apiDomain + '/api/student/plan/finalize/' + id;
  return putData(url);
}

export function getStudentSchool(id) {
  const url = apiDomain + '/api/student/school/' + id;
  return getData(url);
}

export function saveStudentNote(data: {}) {
  const url = apiDomain + '/api/student/note/save';
  return postData(url, data);
}

export function deleteStudentNote(id: string) {
  const url = apiDomain + '/api/student/note/delete/' + id;
  return putData(url);
}

export function getStudentNotes(id) {
  const url = apiDomain + '/api/student/notes/' + id;
  return getData(url);
}

export function getStudentAttendance(id) {
  const url = apiDomain + '/api/student/attendance/' + id;
  return getData(url);
}

export function getStudentAttendances(id) {
  const url = apiDomain + '/api/student/attendances/' + id;
  return getData(url);
}

export function saveStudentAttendance(data: {}) {
  const url = apiDomain + '/api/student/attendance/save';
  return postData(url, data);
}

export function deleteStudentAttendance({ Id }) {
  const url = apiDomain + '/api/student/attendance/delete/' + Id;
  return putData(url);
}

// DEPRECATED getStudentClasses:
export function getStudentClasses(id) {
  const url = apiDomain + '/api/student/classes/' + id;
  return getData(url);
}
export function getStudentStyleClasses(data) {
  const url =
    apiDomain +
    '/api/student/style/classes/' +
    data.studentId +
    '/' +
    data.schoolStyleId;
  return getData(url);
}
export function saveStudentMessage(data: {}) {
  const url = apiDomain + '/api/student/message/save';
  return postData(url, data);
}

export function deleteStudentMessage(id: string) {
  const url = apiDomain + '/api/student/message/delete/' + id;
  return putData(url);
}

export function getStudentMessages(id) {
  const url = apiDomain + '/api/student/messages/' + id;
  return getData(url);
}

export function getStudentStyleRankProgression(id) {
  const url = apiDomain + '/api/student/stylerank/progression/' + id;
  return getData(url);
}

export function getStudentStyleRankProgressionSummary(id) {
  const url = apiDomain + '/api/student/stylerank/progression/summary/' + id;
  return getData(url);
}

export function getStudentStyleRankProgressions(id) {
  const url = apiDomain + '/api/student/stylerank/progressions/' + id;
  return getData(url);
}

export function getStudentStyleRankProgressionsByStyle(data) {
  const url =
    apiDomain +
    '/api/student/stylerank/progressions/' +
    data.studentId +
    '/' +
    data.schoolId +
    '/' +
    data.schoolStyleId;
  return getData(url);
}

export function saveStudentStyleRankProgression(data: {}) {
  const url = apiDomain + '/api/student/stylerank/progression/save';
  return postData(url, data);
}

export function deleteStudentStyleRankProgression(id: string) {
  const url = apiDomain + '/api/student/stylerank/progression/delete/' + id;
  return putData(url);
}

export function getStudentStyleRank(id) {
  const url = apiDomain + '/api/student/stylerank/' + id;
  return getData(url);
}

export function saveStyleRankPromotion(data: {}) {
  const url = apiDomain + '/api/student/stylerank/progression/promote';
  return postData(url, data);
}

export function saveStudentBulkPromote(data: {}) {
  const url = apiDomain + '/api/student/stylerank/progression/bulkpromote';
  return postData(url, data);
}

export function saveStudentBulkDemote(data: {}) {
  const url = apiDomain + '/api/student/stylerank/progression/bulkdemote';
  return postData(url, data);
}

export function getStudentRankRequirementsByStyle(data) {
  const url =
    apiDomain +
    '/api/student/rankrequirements/' +
    data.StudentId +
    '/' +
    data.SchoolStyleId +
    '/' +
    data.StyleRankId;
  return getData(url);
}

export function saveStudentRankRequirement(data: {}) {
  const url = apiDomain + '/api/student/rankrequirement/save';
  return postData(url, data);
}

export function deleteStudentRankRequirement(id: string) {
  const url = apiDomain + '/api/student/rankrequirement/delete/' + id;
  return putData(url);
}

export function getStudentContacts(id: string) {
  const url = apiDomain + '/api/student/contacts/' + id;
  return getData(url);
}

export function createStudentContact(data: {}) {
  const url = apiDomain + '/api/student/contact/create';
  return postData(url, data);
}

export function updateStudentContact(data: {}) {
  const url = apiDomain + '/api/student/contact/update';
  return putData(url, data);
}

export function getStudentContactDetail(id: string) {
  const url = apiDomain + '/api/student/contact/' + id;
  return getData(url);
}

export function deleteStudentContact(id: string) {
  const url = apiDomain + '/api/student/contact/delete/' + id;
  return putData(url);
}

export function getEFCFlaggedNotes() {
  const url = apiDomain + '/api/student/efcflaggednotes';
  return getData(url);
}

export function getInternalEFCUserFlaggedNotes(id: string) {
  const url = apiDomain + '/api/student/internalefcuser/flaggednotes/' + id;
  return getData(url);
}

export function getNotesForSchool(id: string) {
  const url = apiDomain + '/api/student/notesforschool/' + id;
  return getData(url);
}

export function saveStudentOwner(data: {}) {
  const url = apiDomain + '/api/student/owner/save';
  return postData(url, data);
}

export function getStudentOwner(id: string) {
  const url = apiDomain + '/api/student/owner/plan/' + id;
  return getData(url);
}

export function getPlanPaymentAccounts(id: string) {
  const url = apiDomain + '/api/student/planpaymentaccounts/' + id;
  return getData(url);
}

export function savePlanPaymentAccount(data: {}) {
  const url = apiDomain + '/api/student/planpaymentaccount/save';
  return postData(url, data);
}

export function deleteStudentPlanPaymentAccount(id: string) {
  const url = apiDomain + '/api/student/planpaymentaccount/delete/' + id;
  return putData(url);
}

// The name of the api must be renamed
export function updateStudentPlan(data: {}) {
  const url = apiDomain + '/api/student/plan/update/';
  return putData(url, data);
}

// export function saveStudentPlan(data: {}) {
//   const url = apiDomain + '/api/student/plan/save/';
//   return postData(url, data);
// }

// Name of the api function is wrong. Change the name.
// This should be named as "getStudentPlanByPlanId"
export function getStudentPlan(id: string) {
  const url = apiDomain + '/api/student/plan/' + id;
  return getData(url);
}

export function getStudentPaymentAuthorization(id: string) {
  const url = apiDomain + '/api/student/paymentAuthorization/generate/' + id;
  return getData(url);
}

export function updateStudentPaymentAuthorization(data: {}) {
  const url = apiDomain + '/api/student/paymentAuthorization/save';
  return putData(url, data);
}

export function saveStudentPlanDiscount(data: {}) {
  const url = apiDomain + '/api/student/plandiscount/save';
  return postData(url, data);
}

export function getStudentPlanDiscounts(id: string) {
  const url = apiDomain + '/api/student/plandiscounts/' + id;
  return getData(url);
}

export function deleteStudentPlanDiscount(id: string) {
  const url = apiDomain + '/api/student/plandiscount/delete/' + id;
  return putData(url);
}

export function getStudentOwners(id: string) {
  const url = apiDomain + '/api/student/owners/' + id;
  return getData(url);
}

export function getStudentPlanSummaryPdf(id: string) {
  const url = apiDomain + '/api/student/plan/summary/pdf/' + id;
  return getPdfBlobData(url);
}

export function saveStudentEmailPlanSummary(id: string) {
  const url = apiDomain + '/api/student/plan/summary/email/' + id;
  return postData(url);
}

export function getStudentOutbox(id: string) {
  const url = apiDomain + '/api/student/outbox/' + id;
  return getData(url);
}

export function deleteStudentPlan(id: string) {
  const url = apiDomain + '/api/student/plan/' + id;
  return deleteData(url);
}

export function deleteStudent(id: string) {
  const url = apiDomain + '/api/student/' + id;
  return deleteData(url);
}
export function postVerifyStudent(studentId: string) {
  const url = `${apiDomain}/api/student/verified/${studentId}`;
  return putData(url);
}
