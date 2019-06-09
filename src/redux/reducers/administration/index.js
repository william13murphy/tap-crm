import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import allUsers from './allUsers';
import efcUsers from './efcUsers';
import user from './user';
import userPost from './userPost';
import efcUserEmailTemplatePost from './efcUserEmailTemplatePost';
import efcUserEmailTemplate from './efcUserEmailTemplate';
import efcUserEmailTemplates from './efcUserEmailTemplates';
import efcUserLetterTemplatePost from './efcUserLetterTemplatePost';
import efcUserLetterTemplate from './efcUserLetterTemplate';
import efcUserLetterTemplates from './efcUserLetterTemplates';
import efcUserSchools from './efcUserSchools';
import efcUserOutbox from './efcUserOutbox';
import efcUserOutboxGroup from './efcUserOutboxGroup';
import efcUserSMSTemplatePost from './efcUserSMSTemplatePost';
import efcUserSMSTemplate from './efcUserSMSTemplate';
import efcUserSMSTemplates from './efcUserSMSTemplates';
import efcUserEmailOutboxPost from './efcUserEmailOutboxPost';
import efcUserLetterOutboxPost from './efcUserLetterOutboxPost';
import efcUserSMSOutboxPost from './efcUserSMSOutboxPost';
import efcUserCustomReport from './efcUserCustomReport';
import efcUserCustomReports from './efcUserCustomReports';
import efcUserCustomReportPost from './efcUserCustomReportPost';
import nonEfcUsersSearch from './nonEfcUsersSearch';
import nonEfcUsersUpdate from './nonEfcUsersUpdate';

export const administrationInitialState = {
  allUsers: Object.assign({}, emptyFetchState),
  efcUsers: Object.assign({}, emptyFetchState),
  user: Object.assign({}, emptyFetchState),
  userPost: Object.assign({}, emptyFormState),
  efcUserEmailOutboxPost: Object.assign({}, emptyFormState),
  efcUserEmailTemplatePost: Object.assign({}, emptyFormState),
  efcUserEmailTemplate: Object.assign({}, emptyFetchState),
  efcUserEmailTemplates: Object.assign({}, emptyFetchState),
  efcUserLetterOutboxPost: Object.assign({}, emptyFormState),
  efcUserLetterTemplatePost: Object.assign({}, emptyFormState),
  efcUserLetterTemplate: Object.assign({}, emptyFetchState),
  efcUserLetterTemplates: Object.assign({}, emptyFetchState),
  efcUserSchools: Object.assign({}, emptyFetchState),
  efcUserOutbox: Object.assign({}, emptyFetchState),
  efcUserOutboxGroup: Object.assign({}, emptyFetchState),
  efcUserSMSOutboxPost: Object.assign({}, emptyFormState),
  efcUserSMSTemplatePost: Object.assign({}, emptyFormState),
  efcUserSMSTemplate: Object.assign({}, emptyFetchState),
  efcUserSMSTemplates: Object.assign({}, emptyFetchState),
  efcUserCustomReport: Object.assign({}, emptyFetchState),
  efcUserCustomReports: Object.assign({}, emptyFetchState),
  efcUserCustomReportPost: Object.assign({}, emptyFormState),
  nonEfcUsersSearch: Object.assign({}, emptyFetchState),
  nonEfcUsersUpdate: Object.assign({}, emptyFetchState),
};

export function administrationReducer(state, action) {
  return {
    allUsers: allUsers(state.allUsers, action),
    efcUsers: efcUsers(state.efcUsers, action),
    user: user(state.user, action),
    userPost: userPost(state.userPost, action),
    efcUserEmailOutboxPost: efcUserEmailOutboxPost(
      state.efcUserEmailOutboxPost,
      action
    ),
    efcUserEmailTemplatePost: efcUserEmailTemplatePost(
      state.efcUserEmailTemplatePost,
      action
    ),
    efcUserEmailTemplate: efcUserEmailTemplate(
      state.efcUserEmailTemplate,
      action
    ),
    efcUserEmailTemplates: efcUserEmailTemplates(
      state.efcUserEmailTemplates,
      action
    ),
    efcUserLetterOutboxPost: efcUserLetterOutboxPost(
      state.efcUserLetterOutboxPost,
      action
    ),
    efcUserLetterTemplatePost: efcUserLetterTemplatePost(
      state.efcUserLetterTemplatePost,
      action
    ),
    efcUserLetterTemplate: efcUserLetterTemplate(
      state.efcUserLetterTemplate,
      action
    ),
    efcUserLetterTemplates: efcUserLetterTemplates(
      state.efcUserLetterTemplates,
      action
    ),
    efcUserSchools: efcUserSchools(state.efcUserSchools, action),
    efcUserOutbox: efcUserOutbox(state.efcUserOutbox, action),
    efcUserOutboxGroup: efcUserOutboxGroup(state.efcUserOutboxGroup, action),
    efcUserSMSOutboxPost: efcUserSMSOutboxPost(
      state.efcUserSMSOutboxPost,
      action
    ),
    efcUserSMSTemplatePost: efcUserSMSTemplatePost(
      state.efcUserSMSTemplatePost,
      action
    ),
    efcUserSMSTemplate: efcUserSMSTemplate(state.efcUserSMSTemplate, action),
    efcUserSMSTemplates: efcUserSMSTemplates(state.efcUserSMSTemplates, action),
    efcUserCustomReport: efcUserCustomReport(state.efcUserCustomReport, action),
    efcUserCustomReports: efcUserCustomReports(
      state.efcUserCustomReports,
      action
    ),
    efcUserCustomReportPost: efcUserCustomReportPost(
      state.efcUserCustomReportPost,
      action
    ),
    nonEfcUsersSearch: nonEfcUsersSearch(state.nonEfcUsersSearch, action),
    nonEfcUsersUpdate: nonEfcUsersUpdate(state.nonEfcUsersUpdate, action),
  };
}
