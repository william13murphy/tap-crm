import {
  apiDomain,
  getData,
  postData,
  putData,
  postBlobData,
  deleteData,
} from '../_base';

export function getSchools() {
  const url = apiDomain + '/api/school/aschools';
  return getData(url);
}

export function createSchool(data: {}) {
  const url = apiDomain + '/api/school/create';
  return postData(url, data);
}

export function updateSchool(data: {}) {
  const url = apiDomain + '/api/school/update';
  return putData(url, data);
}

export function getSchoolAnemicDetail(id: string) {
  const url = apiDomain + '/api/school/aschool/' + id;
  return getData(url);
}

export function getSchoolContacts(id: string) {
  const url = apiDomain + '/api/school/contacts/' + id;
  return getData(url);
}

export function saveSchoolContact(data: {}) {
  const url = apiDomain + '/api/school/contact/save';
  return postData(url, data);
}

export function getSchoolStyles(id: string) {
  const url = apiDomain + '/api/school/styles/' + id;
  return getData(url);
}

export function saveSchoolStyle(data: {}) {
  const url = apiDomain + '/api/school/style/save';
  return postData(url, data);
}

export function getSchoolStyleRanks(styleId: string) {
  const url = apiDomain + '/api/school/style/ranks/' + styleId;
  return getData(url);
}

export function saveSchoolStyleRank(data: {}) {
  const url = apiDomain + '/api/school/style/rank/save';
  return postData(url, data);
}

export function getSchoolStyleClasses(styleId: string) {
  const url = apiDomain + '/api/school/style/classes/' + styleId;
  return getData(url);
}

export function saveSchoolAddress(data: {}) {
  const url = apiDomain + '/api/school/address/save';
  return postData(url, data);
}

export function saveSchoolBank(data: {}) {
  const url = apiDomain + '/api/school/bank/save';
  return postData(url, data);
}

export function getSchoolBank(id: string) {
  const url = apiDomain + '/api/school/bank/' + id;
  return getData(url);
}

export function getSchoolNotes(id: string) {
  const url = apiDomain + '/api/school/notes/' + id;
  return getData(url);
}

export function saveSchoolNote(data: {}) {
  const url = apiDomain + '/api/school/note/save';
  return postData(url, data);
}

export function saveSchoolRate(data: {}) {
  const url = apiDomain + '/api/school/rate/save';
  return postData(url, data);
}

export function deleteSchoolRate(id: string) {
  const url = apiDomain + '/api/school/rate/delete/' + id;
  return putData(url);
}

export function getSchoolStudentPlans(schoolId: string) {
  const url = apiDomain + '/api/school/student/plans/' + schoolId;
  return getData(url);
}

export function getSchoolDiscounts(id: string) {
  const url = apiDomain + '/api/school/discounts/' + id;
  return getData(url);
}

export function saveSchoolDiscount(data: {}) {
  const url = apiDomain + '/api/school/discount/save';
  return postData(url, data);
}

export function getSchoolAnemicStudents(id: string) {
  const url = apiDomain + '/api/school/astudents/' + id;
  return getData(url);
}

export function getSchoolClient(id: string) {
  const url = apiDomain + '/api/school/client/' + id;
  return getData(url);
}

export function getSchoolContact(id: string) {
  const url = apiDomain + '/api/school/contact/' + id;
  return getData(url);
}

export function getSchoolLeads(id: string) {
  const url = apiDomain + '/api/school/marketing/leads/' + id;
  return getData(url);
}
export function saveSchoolLead(data: {}) {
  const url = apiDomain + '/api/school/marketing/lead/save';
  return postData(url, data);
}

export function convertSchoolLeadToStudent(params: string) {
  const url = apiDomain + '/api/school/marketing/lead/convert/' + params.Id;
  return putData(url);
}

export function getSchoolMarketings(id: string) {
  const url = apiDomain + '/api/school/marketings/' + id;
  return getData(url);
}

export function saveSchoolMarketing(data: {}) {
  const url = apiDomain + '/api/school/marketing/save';
  return postData(url, data);
}

export function postSchoolCalendar(data: {}) {
  const url = apiDomain + '/api/school/calendar';
  return postData(url, data);
}

export function postSchoolContactCalendar(data: {}) {
  const url = apiDomain + '/api/school/contact/calendar';
  return postData(url, data);
}

export function postSchoolInstructorCalendar(data: {}) {
  const url = apiDomain + '/api/school/instructor/calendar';
  return postData(url, data);
}

export function postSchoolInstructorsCalendar(data: {}) {
  const url = apiDomain + '/api/school/instructors/calendar';
  return postData(url, data);
}

export function getSchoolEmailTemplate(id: string) {
  const url = apiDomain + '/api/school/template/email/' + id;
  return getData(url);
}

export function getSchoolAllEmailTemplates(id: string) {
  const url = apiDomain + '/api/school/template/emails/' + id;
  return getData(url);
}

export function saveSchoolEmailTemplate(data: {}) {
  const url = apiDomain + '/api/school/template/email/save';
  return postData(url, data);
}

export function postSchoolOutboxLetter(data: {}) {
  const url = apiDomain + '/api/school/outbox/letter';
  return postBlobData(url, data);
}

export function deleteSchoolEmailTemplate(id: string) {
  const url = apiDomain + '/api/school/template/email/delete/' + id;
  return putData(url);
}

export function getSchoolLetterTemplate(id: string) {
  const url = apiDomain + '/api/school/template/letter/' + id;
  return getData(url);
}

export function getSchoolAllLetterTemplates(id: string) {
  const url = apiDomain + '/api/school/template/letters/' + id;
  return getData(url);
}

export function saveSchoolLetterTemplate(data: {}) {
  const url = apiDomain + '/api/school/template/letter/save';
  return postData(url, data);
}

export function deleteSchoolLetterTemplate(id: string) {
  const url = apiDomain + '/api/school/template/letter/delete/' + id;
  return putData(url);
}
export function getSchoolSMSTemplate(id: string) {
  const url = apiDomain + '/api/school/template/sms/' + id;
  return getData(url);
}

export function getSchoolAllSMSTemplates(id: string) {
  const url = apiDomain + '/api/school/template/smss/' + id;
  return getData(url);
}

export function saveSchoolSMSTemplate(data: {}) {
  const url = apiDomain + '/api/school/template/sms/save';
  return postData(url, data);
}

export function deleteSchoolSMSTemplate(id: string) {
  const url = apiDomain + '/api/school/template/sms/delete/' + id;
  return putData(url);
}

export function getSchoolAllOutbox(id: string) {
  const url = apiDomain + '/api/school/outbox/' + id;
  return getData(url);
}

export function getSchoolAllOutboxGroup(id: string) {
  const url = apiDomain + '/api/school/outbox/group/' + id;
  return getData(url);
}

export function getSchoolStudentListDetail(id: string) {
  const url = apiDomain + '/api/school/customreport/' + id;
  return getData(url);
}

export function getSchoolAllStudentLists(id: string) {
  const url = apiDomain + '/api/school/customreports/' + id;
  return getData(url);
}

export function saveSchoolStudentList(data: {}) {
  const url = apiDomain + '/api/school/customreport/save';
  return postData(url, data);
}

export function saveSchoolClass(data: {}) {
  const url = apiDomain + '/api/school/class/save';
  return postData(url, data);
}

export function getSchoolClass(id: string) {
  const url = apiDomain + '/api/school/class/' + id;
  return getData(url);
}

// Students already checked-in to a class-schedule:
export function getSchoolClassScheduleStudents(id: string) {
  const url = apiDomain + '/api/school/class/schedule/students/' + id;
  return getData(url);
}

// Students enrolled in the Scheduled class
export function getSchoolClassStudentsEnrolled(id: string) {
  const url = apiDomain + '/api/school/class/' + id + '/studentsenrolled/';
  return getData(url);
}

// Students authorized to checked-in to a class-schedule:
export function getSchoolClassScheduleAuthorized(id: string) {
  const url = apiDomain + '/api/school/class/schedule/authorized/' + id;
  return getData(url);
}

// Students grading summary for a class-schedule:
export function getSchoolClassScheduleProgression({ Id, SchoolId }) {
  const url =
    apiDomain + '/api/school/class/schedule/progression/' + SchoolId + '/' + Id;
  return getData(url);
}
export function getSchoolStyleStudentsProgression(params: {}) {
  const url =
    apiDomain +
    '/api/school/style/students/progression/' +
    params.schoolId +
    '/' +
    params.styleId;
  return getData(url);
}

export function getSchoolInstructors(id: string) {
  const url = apiDomain + '/api/school/instructors/' + id;
  return getData(url);
}

export function getSchoolUtilityStudents(id: string) {
  const url = apiDomain + '/api/school/utility/students/' + id;
  return getData(url);
}

export function getSchoolUtilityStaffs(id: string) {
  const url = apiDomain + '/api/school/utility/staffs/' + id;
  return getData(url);
}

export function getSchoolStyleDetail(id: string) {
  const url = apiDomain + '/api/school/style/' + id;
  return getData(url);
}

export function getSchoolInstructorStyles(id: string) {
  const url = apiDomain + '/api/school/style/instructor/styles/' + id;
  return getData(url);
}

export function getSchoolClasses(id: string) {
  const url = apiDomain + '/api/school/classes/' + id;
  return getData(url);
}

export function postSchoolSearchFuzzy(data: {}) {
  const url = apiDomain + '/api/school/search/fuzzy';
  return postData(url, data);
}

export function postSchoolAllSearchFuzzy(data: {}) {
  const url = apiDomain + '/api/school/all/search/fuzzy';
  return postData(url, data);
}

export function postSchoolClockInOut(data: {}) {
  const url = apiDomain + '/api/school/clockinout';
  return postData(url, data);
}

export function getSchoolClockInOut(id: string) {
  const url = apiDomain + '/api/school/clockinout/' + id;
  return getData(url);
}

export function getSchoolClockInOuts(id: string) {
  const url = apiDomain + '/api/school/clockinouts/' + id;
  return getData(url);
}
export function postSchoolOutboxEmail(data: {}) {
  const url = apiDomain + '/api/school/outbox/email';
  return postData(url, data);
}

export function postSchoolOutboxSMS(data: {}) {
  const url = apiDomain + '/api/school/outbox/sms';
  return postData(url, data);
}

export function getSchoolStyleRateAdditionalClass(id: string) {
  const url = apiDomain + '/api/school/stylerateadditionalclass/' + id;
  return getData(url);
}

export function getSchoolStyleRateAdditionalClasses(data: string) {
  const url =
    apiDomain + '/api/school/stylerateadditionalclasses/' + data.styleRateId;
  return getData(url);
}

export function postSchoolStyleRateAdditionalClass(data: {}) {
  const url = apiDomain + '/api/school/stylerateadditionalclass/save';
  return postData(url, data);
}
export function deleteSchoolStyleRateAdditionalClasses(id: string) {
  const url =
    apiDomain + '/api/school/stylerateadditionalclass/delete/' + id.Id;
  return putData(url);
}
export function getSchoolStyleRates(id: string) {
  const url = apiDomain + '/api/school/stylerates/' + id;
  return getData(url);
}

export function getSchoolStyleRate(id: string) {
  const url = apiDomain + '/api/school/stylerate/' + id;
  return getData(url);
}

export function postSchoolStyleRate(data: {}) {
  const url = apiDomain + '/api/school/stylerate/save';
  return postData(url, data);
}

export function getSchoolAddresses(id: string) {
  const url = apiDomain + '/api/school/addresses/' + id;
  return getData(url);
}

export function getSchoolRates(id: string) {
  const url = apiDomain + '/api/school/rates/' + id;
  return getData(url);
}

export function getSchoolProfile(id: string) {
  const url = apiDomain + '/api/school/profile/' + id;
  return getData(url);
}

export function updateSchoolProfile(data: {}) {
  const url = apiDomain + '/api/school/profile/save';
  return putData(url, data);
}

export function getSchoolRankRequirement(id: string) {
  const url = apiDomain + '/api/school/rankrequirement/' + id;
  return getData(url);
}

export function getSchoolRankRequirements(id: string) {
  const url = apiDomain + '/api/school/rankrequirements/' + id;
  return getData(url);
}

export function postSchoolRankRequirement(data: {}) {
  const url = apiDomain + '/api/school/rankrequirement/save';
  return postData(url, data);
}

export function deleteSchoolRankRequirement(id: string) {
  const url = apiDomain + '/api/school/rankrequirement/delete/' + id;
  return putData(url);
}

export function deleteSchoolContact(id: string) {
  const url = apiDomain + '/api/school/contact/delete/' + id;
  return putData(url);
}

export function postSchoolAccountStatement(data: {}) {
  const url = apiDomain + '/api/school/account/statement';
  return postData(url, data);
}

export function postSchoolAccountSummary(data: {}) {
  const url = apiDomain + '/api/school/account/summary';
  return postData(url, data);
}

export function saveSchoolSmartReport(data: {}) {
  const url = apiDomain + '/api/school/smartreport/save';
  return postData(url, data);
}

export function getSchoolSmartReportDetail(id: string) {
  const url = apiDomain + '/api/school/smartreport/' + id;
  return getData(url);
}

export function getSchoolSmartReports(id: string) {
  const url = apiDomain + '/api/school/smartreports/' + id;
  return getData(url);
}

export function postSchoolSmartReportGenerate(data: {}) {
  const url = apiDomain + '/api/school/smartreport/generate';
  return postData(url, data);
}

export function postSchoolSmartReportGenerateExcel(data: {}) {
  const url = apiDomain + '/api/school/smartreport/generate/excel';
  return postBlobData(url, data);
}

export function deleteSchoolSmartReport(id: string) {
  const url = apiDomain + '/api/school/smartreport/delete/' + id;
  return putData(url);
}

export function deleteSchool(id: string) {
  const url = apiDomain + '/api/school/' + id;
  return deleteData(url);
}

export function deleteSchoolStaff(id: string) {
  const url = apiDomain + '/api/school/staff/' + id;
  return deleteData(url);
}

export function deleteSchoolStyle(id: string) {
  const url = apiDomain + '/api/school/style/' + id;
  return deleteData(url);
}

export function postImportSchoolPrograms({ schoolId, file }) {
  const url =
    apiDomain +
    '/api/school/style/import/' +
    '?schoolId=' +
    schoolId +
    '&file=' +
    file;

  return postData(url);
}
export function getUnverifiedStudents(schoolId: string) {
  const url = `${apiDomain}/api/school/unverified/${schoolId}`;
  return getData(url);
}
