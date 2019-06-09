import { apiDomain, getData, postData, putData } from '../_base';

export function getEfcUsers() {
  const url = apiDomain + '/api/administration/users/efc';
  return getData(url);
}

export function getAllUsers() {
  const url = apiDomain + '/api/administration/ausers';
  return getData(url);
}

export function getUser(id: string) {
  const url = apiDomain + '/api/administration/user/' + id;
  return getData(url);
}

export function updateUser(data: {}) {
  const url = apiDomain + '/api/administration/user/update';
  return putData(url, data);
}

export function createUser(data) {
  const url = apiDomain + '/api/administration/user/create';
  return postData(url, data);
}

export function getEfcUserSchools(id: string) {
  const url = apiDomain + '/api/administration/efcuser/schools/' + id;
  return getData(url);
}

export function getEfcUserOutbox(id: string) {
  const url = apiDomain + '/api/administration/efcuser/outbox/' + id;
  return getData(url);
}

export function getEfcUserOutboxGroup(id: string) {
  const url = apiDomain + '/api/administration/efcuser/outbox/group/' + id;
  return getData(url);
}

export function postEfcUserEmailOutbox(data) {
  const url = apiDomain + '/api/administration/efcuser/outbox/email';
  return postData(url, data);
}

export function postEfcUserSMSOutbox(data) {
  const url = apiDomain + '/api/administration/efcuser/outbox/sms';
  return postData(url, data);
}

export function postEfcUserLetterOutbox(data) {
  const url = apiDomain + '/api/administration/efcuser/outbox/letter';
  return postData(url, data);
}

export function getEfcUserLetterTemplate(id: string) {
  const url = apiDomain + '/api/administration/efcuser/template/letter/' + id;
  return getData(url);
}

export function getEfcUserLetterTemplates() {
  const url = apiDomain + '/api/administration/efcuser/template/letters';
  return getData(url);
}

export function postEfcUserLetterTemplate(data) {
  const url = apiDomain + '/api/administration/efcuser/template/letter/save';
  return postData(url, data);
}

export function deleteEfcUserLetterTemplate(id: string) {
  const url =
    apiDomain + '/api/administration/efcuser/template/letter/delete/' + id;
  return putData(url);
}

export function getEfcUserEmailTemplate(id: string) {
  const url = apiDomain + '/api/administration/efcuser/template/email/' + id;
  return getData(url);
}

export function getEfcUserEmailTemplates() {
  const url = apiDomain + '/api/administration/efcuser/template/emails';
  return getData(url);
}

export function postEfcUserEmailTemplate(data) {
  const url = apiDomain + '/api/administration/efcuser/template/email/save';
  return postData(url, data);
}

export function deleteEfcUserEmailTemplate(id: string) {
  const url =
    apiDomain + '/api/administration/efcuser/template/email/delete/' + id;
  return putData(url);
}

export function getEfcUserSMSTemplate(id: string) {
  const url = apiDomain + '/api/administration/efcuser/template/sms/' + id;
  return getData(url);
}

export function getEfcUserSMSTemplates() {
  const url = apiDomain + '/api/administration/efcuser/template/smss';
  return getData(url);
}

export function postEfcUserSMSTemplate(data) {
  const url = apiDomain + '/api/administration/efcuser/template/sms/save';
  return postData(url, data);
}

export function deleteEfcUserSMSTemplate(id: string) {
  const url =
    apiDomain + '/api/administration/efcuser/template/sms/delete/' + id;
  return putData(url);
}

export function getEfcUserCustomReport(id: string) {
  const url = apiDomain + '/api/administration/efcuser/customreport/' + id;
  return getData(url);
}

//update url when fixed on back end
export function getEfcUserCustomReports(id: string) {
  const url = apiDomain + '/api/administration/customreports/' + id;
  return getData(url);
}

export function postEfcUserCustomReport(data) {
  const url = apiDomain + '/api/administration/efcuser/customreport/save';
  return postData(url, data);
}

export function getAdministrationUsersNonEfc(params: Object) {
  const url =
    apiDomain +
    '/api/administration/users/nonefc/' +
    params.SchoolId +
    '?term=' +
    params.Term;
  return getData(url);
}
