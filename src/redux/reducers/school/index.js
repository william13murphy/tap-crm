// import { combineReducers } from 'redux';
import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import allSchools from './allSchools';
import schoolPost from './schoolPost';
import contacts from './contacts';
import contactPost from './contactPost';
import styles from './styles';
import stylePost from './stylePost';
import styleRanks from './styleRanks';
import styleRankPost from './styleRankPost';
import styleClasses from './styleClasses';
import styleClassesMany from './styleClassesMany';
import addressPost from './addressPost';
import addresses from './addresses';
import bankPost from './bankPost';
import bank from './bank';
import notes from './notes';
import notePost from './notePost';
import ratePost from './ratePost';
import anemicDetail from './anemicDetail';
import styleDetail from './styleDetail';
import discounts from './discounts';
import discountPost from './discountPost';
import anemicStudents from './anemicStudents';
import contact from './contact';
import client from './client';
import calendar from './calendar';
import instructorCalendar from './instructorCalendar';
import instructorsCalendar from './instructorsCalendar';
import contactCalendar from './contactCalendar';
import emailTemplate from './emailTemplate';
import templateEmailPost from './templateEmailPost';
import templateEmailDelete from './templateEmailDelete';

import letterTemplate from './letterTemplate';
import templateLetterPost from './templateLetterPost';
import templateLetterDelete from './templateLetterDelete';

import smsTemplate from './smsTemplate';
import templateSMSPost from './templateSMSPost';
import templateSMSDelete from './templateSMSDelete';

import allEmailTemplates from './allEmailTemplates';
import allLetterTemplates from './allLetterTemplates';
import allSMSTemplates from './allSMSTemplates';
import allOutbox from './allOutbox';
import allStudentLists from './allStudentLists';
import studentListPost from './studentListPost';

import classPost from './classPost';
import classDetail from './classDetail';
import classScheduleStudents from './classScheduleStudents';
import classScheduleAuthorized from './classScheduleAuthorized';
import classScheduleProgression from './classScheduleProgression';
import instructors from './instructors';
import utilityStudents from './utilityStudents';
import utilityStaffs from './utilityStaffs';

import studentPlans from './studentPlans';
import instructorStyles from './instructorStyles';
import studentsEnrolled from './studentsEnrolled';
import studentListDetail from './studentListDetail';

import leads from './leads';
import leadPost from './leadPost';
import marketings from './marketings';
import marketingPost from './marketingPost';

import classes from './classes';

import searchFuzzy from './searchFuzzy';
import allSearchFuzzy from './allSearchFuzzy';
import clockInOutPost from './clockInOutPost';
import clockInOut from './clockInOut';
import clockInOuts from './clockInOuts';

import outboxEmailPost from './outboxEmailPost';
import outboxSMSPost from './outboxSMSPost';
import outboxLetterPost from './outboxLetterPost';
import styleRates from './styleRates';
import styleRateMany from './styleRateMany';
import styleRatePost from './styleRatePost';
import styleRateAdditionalClassesMany from './styleRateAdditionalClassesMany';
import styleRateAdditionalClass from './styleRateAdditionalClass';
import styleRateAdditionalClassPost from './styleRateAdditionalClassPost';
import styleRateAdditionalClassesDelete from './styleRateAdditionalClassesDelete';
import convertLeadToStudent from './convertLeadToStudent';
import rateDelete from './rateDelete';
import rates from './rates';
import profile from './profile';
import profileUpdate from './profileUpdate';
import styleStudentsProgression from './styleStudentsProgression';
import allSearchFuzzyUpdate from './allSearchFuzzyUpdate';
import rankRequirements from './rankRequirements';
import rankRequirementPost from './rankRequirementPost';
import rankRequirementDelete from './rankRequirementDelete';
import contactDelete from './contactDelete';

import allOutboxGroup from './allOutboxGroup';
import smartReportPost from './smartReportPost';
import smartReportGeneratePost from './smartReportGeneratePost';
import smartReportGenerateExcelPost from './smartReportGenerateExcelPost';
import smartReportDetail from './smartReportDetail';
import smartReports from './smartReports';
import smartReportDelete from './smartReportDelete';

import accountSummary from './accountSummary';
import accountStatement from './accountStatement';
import schoolDelete from './schoolDelete';
import staffDelete from './staffDelete';
import styleDelete from './styleDelete';

import importProgramPost from './importProgramPost';

export const schoolInitialState = {
  allSchools: Object.assign({}, emptyFetchState),
  anemicDetail: Object.assign({}, emptyFetchState),
  schoolPost: Object.assign({}, emptyFormState),
  contacts: Object.assign({}, emptyFetchState),
  contactPost: Object.assign({}, emptyFormState),
  styles: Object.assign({}, emptyFetchState),
  stylePost: Object.assign({}, emptyFormState),
  styleClasses: Object.assign({}, emptyFetchState),
  styleClassesMany: Object.assign({}, emptyFetchState),
  styleRanks: Object.assign({}, emptyFetchState),
  styleRankPost: Object.assign({}, emptyFormState),
  addressPost: Object.assign({}, emptyFormState),
  addresses: Object.assign({}, emptyFetchState),
  bankPost: Object.assign({}, emptyFormState),
  bank: Object.assign({}, emptyFetchState),
  notes: Object.assign({}, emptyFetchState),
  notePost: Object.assign({}, emptyFormState),
  ratePost: Object.assign({}, emptyFormState),
  discounts: Object.assign({}, emptyFetchState),
  discountPost: Object.assign({}, emptyFormState),
  anemicStudents: Object.assign({}, emptyFetchState),
  client: Object.assign({}, emptyFetchState),
  contact: Object.assign({}, emptyFetchState),
  calendar: Object.assign({}, emptyFormState),
  contactCalendar: Object.assign({}, emptyFormState),
  instructorCalendar: Object.assign({}, emptyFormState),
  instructorsCalendar: Object.assign({}, emptyFormState),
  emailTemplate: Object.assign({}, emptyFetchState),
  letterTemplate: Object.assign({}, emptyFetchState),
  smsTemplate: Object.assign({}, emptyFetchState),
  templateEmailPost: Object.assign({}, emptyFormState),
  templateLetterPost: Object.assign({}, emptyFormState),
  templateSMSPost: Object.assign({}, emptyFormState),
  templateEmailDelete: Object.assign({}, emptyFormState),
  templateLetterDelete: Object.assign({}, emptyFormState),
  templateSMSDelete: Object.assign({}, emptyFormState),
  allEmailTemplates: Object.assign({}, emptyFetchState),
  allLetterTemplates: Object.assign({}, emptyFetchState),
  allSMSTemplates: Object.assign({}, emptyFetchState),
  allOutbox: Object.assign({}, emptyFetchState),
  allOutboxGroup: Object.assign({}, emptyFetchState),
  allStudentLists: Object.assign({}, emptyFetchState),
  studentListPost: Object.assign({}, emptyFormState),
  classPost: Object.assign({}, emptyFormState),
  classDetail: Object.assign({}, emptyFetchState),
  classScheduleStudents: Object.assign({}, emptyFetchState),
  classScheduleAuthorized: Object.assign({}, emptyFetchState),
  classScheduleProgression: Object.assign({}, emptyFetchState),
  styleStudentsProgression: Object.assign({}, emptyFetchState),
  instructors: Object.assign({}, emptyFetchState),
  utilityStudents: Object.assign({}, emptyFetchState),
  utilityStaffs: Object.assign({}, emptyFetchState),
  studentPlans: Object.assign({}, emptyFetchState),
  studentsEnrolled: Object.assign({}, emptyFetchState),
  instructorStyles: Object.assign({}, emptyFetchState),
  leads: Object.assign({}, emptyFetchState),
  leadPost: Object.assign({}, emptyFormState),
  marketings: Object.assign({}, emptyFetchState),
  marketingPost: Object.assign({}, emptyFormState),
  classes: Object.assign({}, emptyFetchState),
  searchFuzzy: Object.assign({}, emptyFetchState),
  allSearchFuzzy: Object.assign({}, emptyFormState),
  allSearchFuzzyUpdate: Object.assign({}, emptyFetchState),
  clockInOutPost: Object.assign({}, emptyFormState),
  clockInOut: Object.assign({}, emptyFetchState),
  clockInOuts: Object.assign({}, emptyFetchState),
  outboxEmailPost: Object.assign({}, emptyFormState),
  outboxSMSPost: Object.assign({}, emptyFormState),
  styleDetail: Object.assign({}, emptyFetchState),
  styleRates: Object.assign({}, emptyFetchState),
  styleRateMany: Object.assign({}, emptyFetchState),
  styleRatePost: Object.assign({}, emptyFormState),
  styleRateAdditionalClassesMany: Object.assign({}, emptyFetchState),
  styleRateAdditionalClass: Object.assign({}, emptyFetchState),
  styleRateAdditionalClassPost: Object.assign({}, emptyFormState),
  styleRateAdditionalClassesDelete: Object.assign({}, emptyFormState),
  studentListDetail: Object.assign({}, emptyFetchState),
  convertLeadToStudent: Object.assign({}, emptyFormState),
  rateDelete: Object.assign({}, emptyFormState),
  outboxLetterPost: Object.assign({}, emptyFormState),
  rates: Object.assign({}, emptyFetchState),
  profile: Object.assign({}, emptyFetchState),
  profileUpdate: Object.assign({}, emptyFormState),
  rankRequirements: Object.assign({}, emptyFetchState),
  rankRequirementPost: Object.assign({}, emptyFormState),
  rankRequirementDelete: Object.assign({}, emptyFormState),
  contactDelete: Object.assign({}, emptyFormState),
  accountSummary: Object.assign({}, emptyFetchState),
  accountStatement: Object.assign({}, emptyFetchState),
  smartReportPost: Object.assign({}, emptyFormState),
  smartReportGeneratePost: Object.assign({}, emptyFetchState),
  smartReportGenerateExcelPost: Object.assign({}, emptyFetchState),
  smartReportDetail: Object.assign({}, emptyFetchState),
  smartReports: Object.assign({}, emptyFetchState),
  smartReportDelete: Object.assign({}, emptyFormState),
  schoolDelete: Object.assign({}, emptyFormState),
  staffDelete: Object.assign({}, emptyFormState),
  styleDelete: Object.assign({}, emptyFormState),
  importProgramPost: Object.assign({}, emptyFormState),
};

export function schoolReducer(state, action) {
  return {
    allSchools: allSchools(state.allSchools, action),
    anemicDetail: anemicDetail(state.anemicDetail, action),
    styleDetail: styleDetail(state.styleDetail, action),
    schoolPost: schoolPost(state.schoolPost, action),
    contacts: contacts(state.contacts, action),
    contactPost: contactPost(state.contactPost, action),
    styles: styles(state.styles, action),
    stylePost: stylePost(state.stylePost, action),
    styleClasses: styleClasses(state.styleClasses, action),
    styleClassesMany: styleClassesMany(state.styleClassesMany, action),
    styleRanks: styleRanks(state.styleRanks, action),
    styleRankPost: styleRankPost(state.styleRankPost, action),
    addressPost: addressPost(state.addressPost, action),
    addresses: addresses(state.addresses, action),
    bankPost: bankPost(state.bankPost, action),
    bank: bank(state.bank, action),
    notes: notes(state.notes, action),
    notePost: notePost(state.notePost, action),
    ratePost: ratePost(state.ratePost, action),
    discounts: discounts(state.discounts, action),
    discountPost: discountPost(state.discountPost, action),
    anemicStudents: anemicStudents(state.anemicStudents, action),
    client: client(state.client, action),
    contact: contact(state.contact, action),
    calendar: calendar(state.calendar, action),
    contactCalendar: contactCalendar(state.contactCalendar, action),
    instructorCalendar: instructorCalendar(state.instructorCalendar, action),
    instructorsCalendar: instructorsCalendar(state.instructorsCalendar, action),
    emailTemplate: emailTemplate(state.emailTemplate, action),
    letterTemplate: letterTemplate(state.letterTemplate, action),
    smsTemplate: smsTemplate(state.smsTemplate, action),
    templateEmailPost: templateEmailPost(state.templateEmailPost, action),
    templateLetterPost: templateLetterPost(state.templateLetterPost, action),
    templateSMSPost: templateSMSPost(state.templateSMSPost, action),
    templateEmailDelete: templateEmailDelete(state.templateEmailDelete, action),
    templateLetterDelete: templateLetterDelete(
      state.templateLetterDelete,
      action
    ),
    templateSMSDelete: templateSMSDelete(state.templateSMSDelete, action),
    allEmailTemplates: allEmailTemplates(state.allEmailTemplates, action),
    allOutbox: allOutbox(state.allOutbox, action),
    allOutboxGroup: allOutboxGroup(state.allOutboxGroup, action),
    allStudentLists: allStudentLists(state.allStudentLists, action),
    studentListPost: studentListPost(state.studentListPost, action),
    allLetterTemplates: allLetterTemplates(state.allLetterTemplates, action),
    allSMSTemplates: allSMSTemplates(state.allSMSTemplates, action),
    classPost: classPost(state.classPost, action),
    classDetail: classDetail(state.classDetail, action),
    classScheduleStudents: classScheduleStudents(
      state.classScheduleStudents,
      action
    ),
    classScheduleAuthorized: classScheduleAuthorized(
      state.classScheduleAuthorized,
      action
    ),
    classScheduleProgression: classScheduleProgression(
      state.classScheduleProgression,
      action
    ),
    styleStudentsProgression: styleStudentsProgression(
      state.styleStudentsProgression,
      action
    ),
    instructors: instructors(state.instructors, action),
    utilityStudents: utilityStudents(state.utilityStudents, action),
    utilityStaffs: utilityStaffs(state.utilityStaffs, action),
    studentPlans: studentPlans(state.studentPlans, action),
    studentsEnrolled: studentsEnrolled(state.studentsEnrolled, action),
    instructorStyles: instructorStyles(state.instructorStyles, action),
    leads: leads(state.leads, action),
    leadPost: leadPost(state.leadPost, action),
    marketings: marketings(state.marketings, action),
    marketingPost: marketingPost(state.marketingPost, action),
    classes: classes(state.classes, action),
    searchFuzzy: searchFuzzy(state.searchFuzzy, action),
    allSearchFuzzy: allSearchFuzzy(state.allSearchFuzzy, action),
    allSearchFuzzyUpdate: allSearchFuzzyUpdate(
      state.allSearchFuzzyUpdate,
      action
    ),
    clockInOutPost: clockInOutPost(state.clockInOutPost, action),
    clockInOut: clockInOut(state.clockInOut, action),
    clockInOuts: clockInOuts(state.clockInOuts, action),
    outboxEmailPost: outboxEmailPost(state.outboxEmailPost, action),
    outboxSMSPost: outboxSMSPost(state.outboxSMSPost, action),
    styleRates: styleRates(state.styleRates, action),
    styleRateMany: styleRateMany(state.styleRateMany, action),
    styleRatePost: styleRatePost(state.styleRatePost, action),
    styleRateAdditionalClassesMany: styleRateAdditionalClassesMany(
      state.styleRateAdditionalClassesMany,
      action
    ),
    styleRateAdditionalClass: styleRateAdditionalClass(
      state.styleRateAdditionalClass,
      action
    ),
    styleRateAdditionalClassPost: styleRateAdditionalClassPost(
      state.styleRateAdditionalClassPost,
      action
    ),
    styleRateAdditionalClassesDelete: styleRateAdditionalClassesDelete(
      state.styleRateAdditionalClassesDelete,
      action
    ),
    studentListDetail: studentListDetail(state.studentListDetail, action),
    convertLeadToStudent: convertLeadToStudent(
      state.convertLeadToStudent,
      action
    ),
    rateDelete: rateDelete(state.rateDelete, action),
    outboxLetterPost: outboxLetterPost(state.outboxLetterPost, action),
    rates: rates(state.rates, action),
    profile: profile(state.profile, action),
    profileUpdate: profileUpdate(state.profileUpdate, action),
    rankRequirements: rankRequirements(state.rankRequirements, action),
    rankRequirementPost: rankRequirementPost(state.rankRequirementPost, action),
    rankRequirementDelete: rankRequirementDelete(
      state.rankRequirementDelete,
      action
    ),
    contactDelete: contactDelete(state.contactDelete, action),
    accountSummary: accountSummary(state.accountSummary, action),
    accountStatement: accountStatement(state.accountStatement, action),
    smartReportPost: smartReportPost(state.smartReportPost, action),
    smartReportGeneratePost: smartReportGeneratePost(
      state.smartReportGeneratePost,
      action
    ),
    smartReportGenerateExcelPost: smartReportGenerateExcelPost(
      state.smartReportGenerateExcelPost,
      action
    ),
    smartReportDetail: smartReportDetail(state.smartReportDetail, action),
    smartReports: smartReports(state.smartReports, action),
    smartReportDelete: smartReportDelete(state.smartReportDelete, action),
    schoolDelete: schoolDelete(state.schoolDelete, action),
    staffDelete: staffDelete(state.staffDelete, action),
    styleDelete: styleDelete(state.styleDelete, action),
    importProgramPost: importProgramPost(state.importProgramPost, action),
  };
}
