import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import ownerPost from './ownerPost';
import owner from './owner';
import detail from './detail';
import detailMany from './detailMany';
import contactDetail from './contactDetail';
import contacts from './contacts';
import contactPost from './contactPost';
import contactDelete from './contactDelete';
import studentPost from './studentPost';
import studentCalendar from './studentCalendar';
import waiverGenerateMany from './waiverGenerateMany';
import waiverPost from './waiverPost';
import instructor from './instructor';
import school from './school';
import notePost from './notePost';
import notes from './notes';
import noteDelete from './noteDelete';
import attendancePost from './attendancePost';
import attendanceDelete from './attendanceDelete';
import attendances from './attendances';
import classesMany from './classesMany';
import messages from './messages';
import messagePost from './messagePost';
import messageDelete from './messageDelete';
import progressions from './progressions';
import progressionsByStyle from './progressionsByStyle';
import progressionsByStyleMany from './progressionsByStyleMany';
import progressionPost from './progressionPost';
import progressionDelete from './progressionDelete';
import styleRank from './styleRank';
import stylerankPromotion from './stylerankPromotion';
import rankRequirementPost from './rankRequirementPost';
import rankRequirementDelete from './rankRequirementDelete';
import rankRequirementsByStyle from './rankRequirementsByStyle';
import bulkPromotionPost from './bulkPromotionPost';
import progressionSummary from './progressionSummary';
import efcFlaggedNotes from './efcFlaggedNotes';
import internalEFCUserFlaggedNotes from './internalEFCUserFlaggedNotes';
import notesForSchool from './notesForSchool';
import planDetail from './planDetail';
import plans from './plans';
import plan from './plan';
import planEnrollment from './planEnrollment';
import planStudentPost from './planStudentPost';
import planStudentDelete from './planStudentDelete';
import planTerminatePost from './planTerminatePost';
import planStudents from './planStudents';
import planStudentStyleRatesMany from './planStudentStyleRatesMany';
import planStudentStyleRatePost from './planStudentStyleRatePost';
import planStudentStyleRateDelete from './planStudentStyleRateDelete';
import planStudentStyleRateClassesMany from './planStudentStyleRateClassesMany';
import planStudentStyleRateClassesPost from './planStudentStyleRateClassesPost';
import planPaymentAccountPost from './planPaymentAccountPost';
import planPaymentSettlePost from './planPaymentSettlePost';
import planPaymentSuspendPost from './planPaymentSuspendPost';
import planPaymentUpdateStatusPost from './planPaymentUpdateStatusPost';
import planPaymentAccounts from './planPaymentAccounts';
import planPayments from './planPayments';
import planUpdate from './planUpdate';
import planPaymentTerm from './planPaymentTerm';
import planPaymentAccountDelete from './planPaymentAccountDelete';
import paymentAuthorizationDocument from './paymentAuthorizationDocument';
import paymentAuthorizationPost from './paymentAuthorizationPost';
import planDiscountPost from './planDiscountPost';
import planDiscounts from './planDiscounts';
import planDiscountDelete from './planDiscountDelete';
import planSummaryPdf from './planSummaryPdf';
import emailPlanSummaryPost from './emailPlanSummaryPost';
import owners from './owners';
import outbox from './outbox';
import planDelete from './planDelete';
import studentDelete from './studentDelete';

export const studentInitialState = {
  ownerPost: Object.assign({}, emptyFormState),
  owner: Object.assign({}, emptyFetchState),
  detail: Object.assign({}, emptyFetchState),
  detailMany: Object.assign({}, emptyFetchState),
  contacts: Object.assign({}, emptyFetchState),
  contactDetail: Object.assign({}, emptyFetchState),
  contactPost: Object.assign({}, emptyFetchState),
  contactDelete: Object.assign({}, emptyFetchState),
  studentPost: Object.assign({}, emptyFormState),
  studentCalendar: Object.assign({}, emptyFormState),
  waiverGenerateMany: Object.assign({}, emptyFetchState),
  waiverPost: Object.assign({}, emptyFormState),
  instructor: Object.assign({}, emptyFetchState),
  school: Object.assign({}, emptyFetchState),
  notePost: Object.assign({}, emptyFormState),
  noteDelete: Object.assign({}, emptyFormState),
  notes: Object.assign({}, emptyFetchState),
  attendancePost: Object.assign({}, emptyFormState),
  attendanceDelete: Object.assign({}, emptyFormState),
  attendances: Object.assign({}, emptyFetchState),
  classesMany: Object.assign({}, emptyFetchState),
  messagePost: Object.assign({}, emptyFormState),
  messageDelete: Object.assign({}, emptyFormState),
  messages: Object.assign({}, emptyFetchState),
  progressions: Object.assign({}, emptyFetchState),
  progressionsByStyle: Object.assign({}, emptyFetchState),
  progressionsByStyleMany: Object.assign({}, emptyFetchState),
  progressionPost: Object.assign({}, emptyFormState),
  progressionDelete: Object.assign({}, emptyFormState),
  styleRank: Object.assign({}, emptyFetchState),
  stylerankPromotion: Object({}, emptyFormState),
  bulkPromotionPost: Object({}, emptyFormState),
  rankRequirementPost: Object({}, emptyFormState),
  rankRequirementDelete: Object({}, emptyFormState),
  rankRequirementsByStyle: Object({}, emptyFetchState),
  progressionSummary: Object({}, emptyFetchState),
  efcFlaggedNotes: Object({}, emptyFetchState),
  internalEFCUserFlaggedNotes: Object({}, emptyFetchState),
  notesForSchool: Object({}, emptyFetchState),
  planDetail: Object({}, emptyFetchState),
  plan: Object({}, emptyFetchState),
  planTerminatePost: Object({}, emptyFormState),
  plans: Object({}, emptyFetchState),
  planEnrollment: Object({}, emptyFetchState),
  planStudents: Object({}, emptyFetchState),
  planStudentPost: Object({}, emptyFormState),
  planStudentDelete: Object({}, emptyFormState),
  planStudentStyleRatesMany: Object({}, emptyFetchState),
  planStudentStyleRatePost: Object({}, emptyFetchState),
  planStudentStyleRateDelete: Object({}, emptyFormState),
  planStudentStyleRateClassesMany: Object({}, emptyFetchState),
  planStudentStyleRateClassesPost: Object({}, emptyFetchState),
  planPaymentAccountPost: Object({}, emptyFormState),
  planPaymentSettlePost: Object({}, emptyFormState),
  planPaymentSuspendPost: Object({}, emptyFormState),
  planPaymentUpdateStatusPost: Object({}, emptyFormState),
  planPaymentAccounts: Object({}, emptyFetchState),
  planPayments: Object({}, emptyFetchState),
  planUpdate: Object({}, emptyFormState),
  planPaymentTerm: Object({}, emptyFetchState),
  planPaymentAccountDelete: Object({}, emptyFetchState),
  paymentAuthorizationDocument: Object({}, emptyFetchState),
  paymentAuthorizationPost: Object({}, emptyFormState),
  planDiscountPost: Object({}, emptyFormState),
  planDiscounts: Object({}, emptyFetchState),
  planDiscountDelete: Object({}, emptyFormState),
  planSummaryPdf: Object.assign({}, emptyFetchState),
  emailPlanSummaryPost: Object.assign({}, emptyFormState),
  owners: Object({}, emptyFetchState),
  outbox: Object.assign({}, emptyFetchState),
  planDelete: Object.assign({}, emptyFormState),
  studentDelete: Object.assign({}, emptyFormState),
};

export function studentReducer(state, action) {
  return {
    ownerPost: ownerPost(state.ownerPost, action),
    owner: owner(state.owner, action),
    detail: detail(state.detail, action),
    detailMany: detailMany(state.detailMany, action),
    contacts: contacts(state.contacts, action),
    contactDetail: contactDetail(state.contactDetail, action),
    contactPost: contactPost(state.contactPost, action),
    contactDelete: contactDelete(state.contactDelete, action),
    studentPost: studentPost(state.studentPost, action),
    studentCalendar: studentCalendar(state.studentCalendar, action),
    waiverGenerateMany: waiverGenerateMany(state.waiverGenerateMany, action),
    waiverPost: waiverPost(state.waiverPost, action),
    instructor: instructor(state.instructor, action),
    school: school(state.school, action),
    notePost: notePost(state.notePost, action),
    noteDelete: noteDelete(state.noteDelete, action),
    notes: notes(state.notes, action),
    attendancePost: attendancePost(state.attendancePost, action),
    attendanceDelete: attendanceDelete(state.attendanceDelete, action),
    attendances: attendances(state.attendances, action),
    classesMany: classesMany(state.classesMany, action),
    messagePost: messagePost(state.messagePost, action),
    messageDelete: messageDelete(state.messageDelete, action),
    messages: messages(state.messages, action),
    progressions: progressions(state.progressions, action),
    progressionsByStyle: progressionsByStyle(state.progressionsByStyle, action),
    progressionsByStyleMany: progressionsByStyleMany(
      state.progressionsByStyleMany,
      action
    ),
    progressionPost: progressionPost(state.progressionPost, action),
    progressionDelete: progressionDelete(state.progressionDelete, action),
    styleRank: styleRank(state.styleRank, action),
    stylerankPromotion: stylerankPromotion(state.stylerankPromotion, action),
    bulkPromotionPost: bulkPromotionPost(state.bulkPromotionPost, action),
    rankRequirementPost: rankRequirementPost(state.rankRequirementPost, action),
    rankRequirementDelete: rankRequirementDelete(
      state.rankRequirementDelete,
      action
    ),
    rankRequirementsByStyle: rankRequirementsByStyle(
      state.rankRequirementsByStyle,
      action
    ),
    progressionSummary: progressionSummary(state.progressionSummary, action),
    efcFlaggedNotes: efcFlaggedNotes(state.efcFlaggedNotes, action),
    internalEFCUserFlaggedNotes: internalEFCUserFlaggedNotes(
      state.internalEFCUserFlaggedNotes,
      action
    ),
    notesForSchool: notesForSchool(state.notesForSchool, action),
    planDetail: planDetail(state.planDetail, action),
    plan: plan(state.plan, action),
    planTerminatePost: planTerminatePost(state.planTerminatePost, action),
    plans: plans(state.plans, action),
    planEnrollment: planEnrollment(state.planEnrollment, action),
    planStudents: planStudents(state.planStudents, action),
    planStudentPost: planStudentPost(state.planStudentPost, action),
    planStudentDelete: planStudentDelete(state.planStudentDelete, action),
    planStudentStyleRatesMany: planStudentStyleRatesMany(
      state.planStudentStyleRatesMany,
      action
    ),
    planStudentStyleRatePost: planStudentStyleRatePost(
      state.planStudentStyleRatePost,
      action
    ),
    planStudentStyleRateDelete: planStudentStyleRateDelete(
      state.planStudentStyleRateDelete,
      action
    ),
    planStudentStyleRateClassesMany: planStudentStyleRateClassesMany(
      state.planStudentStyleRateClassesMany,
      action
    ),
    planStudentStyleRateClassesPost: planStudentStyleRateClassesPost(
      state.planStudentStyleRateClassesPost,
      action
    ),
    planPaymentAccountPost: planPaymentAccountPost(
      state.planPaymentAccountPost,
      action
    ),
    planPaymentSettlePost: planPaymentSettlePost(
      state.planPaymentSettlePost,
      action
    ),
    planPaymentSuspendPost: planPaymentSuspendPost(
      state.planPaymentSuspendPost,
      action
    ),
    planPaymentUpdateStatusPost: planPaymentUpdateStatusPost(
      state.planPaymentUpdateStatusPost,
      action
    ),
    planPaymentAccounts: planPaymentAccounts(state.planPaymentAccounts, action),
    planPayments: planPayments(state.planPayments, action),
    planUpdate: planUpdate(state.planUpdate, action),
    planPaymentTerm: planPaymentTerm(state.planPaymentTerm, action),
    planPaymentAccountDelete: planPaymentAccountDelete(
      state.planPaymentAccountDelete,
      action
    ),
    paymentAuthorizationDocument: paymentAuthorizationDocument(
      state.paymentAuthorizationDocument,
      action
    ),
    paymentAuthorizationPost: paymentAuthorizationPost(
      state.paymentAuthorizationPost,
      action
    ),
    planDiscountPost: planDiscountPost(state.planDiscountPost, action),
    planDiscounts: planDiscounts(state.planDiscounts, action),
    planDiscountDelete: planDiscountDelete(state.planDiscountDelete, action),
    planSummaryPdf: planSummaryPdf(state.planSummaryPdf, action),
    emailPlanSummaryPost: emailPlanSummaryPost(
      state.emailPlanSummaryPost,
      action
    ),
    owners: owners(state.owners, action),
    outbox: outbox(state.outbox, action),
    planDelete: planDelete(state.planDelete, action),
    studentDelete: studentDelete(state.studentDelete, action),
  };
}
