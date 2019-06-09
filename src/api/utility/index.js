import { apiDomain, getData, postData, putData } from '../_base';

// Get All Message Templates
export function getAllMessageTemplates() {
  const url = apiDomain + '/api/utility/references/messagingtemplates';
  return getData(url);
}

// Get Single Email Template
export function getEmailTemplate(id: string) {
  const url = apiDomain + '/api/utility/references/emailtemplate/' + id;
  return getData(url);
}

// Get Single Letter Template
export function getLetterTemplate(id) {
  const url = apiDomain + '/api/utility/references/lettertemplate/' + id;
  return getData(url);
}

// Get Single SMS Template
export function getSMSTemplate(id) {
  const url = apiDomain + '/api/utility/references/smstemplate/' + id;
  return getData(url);
}

export function createProduct(data) {
  const url = apiDomain + '/api/utility/references/productmaster/create';
  return postData(url, data);
}

export function updateProduct(data: {}) {
  const url = apiDomain + '/api/utility/references/productmaster/update';
  return postData(url, data);
}

export function getAllProducts() {
  const url = apiDomain + '/api/utility/references/productmaster/all';
  return getData(url);
}

// Get a single product by id
export function getProduct(id) {
  const url = apiDomain + '/api/utility/references/productmaster/' + id;
  return getData(url);
}

// Get Admin Activity Log for Admin -> log page.
export function getAdminLog() {
  const url = apiDomain + '/api/utility/references/adminlog/all';
  return getData(url);
}

// Get Company information for Admin -> company info page.
export function getCompanyInformation() {
  const url = apiDomain + '/api/utility/companyinformation';
  return getData(url);
}

// Request a password reset (System send the user an email with password reset link)

export function getValidatePasswordRequest(id: string) {
  const url = apiDomain + '/api/utility/validatepasswordrequest/' + id;
  return getData(url, true);
}

export function postRequestPassword(formData: {}) {
  const url =
    apiDomain + '/api/utility/requestpassword?userName=' + formData.userName;
  return postData(url, {}, true);
}

// Reset password (System send the user an email with password reset link)
export function postResetPassword(id: string, password: string) {
  const url =
    apiDomain +
    '/api/utility/resetpassword/?id=' +
    id +
    '&password=' +
    password;
  return postData(url, {}, true);
}

// Change password - Called "Update password" in the app. Must also provide old password.
export function postChangePassword(
  id: string,
  oldPassword: string,
  newPassword: string
) {
  const url =
    apiDomain +
    '/api/utility/changepassword/' +
    '?id=' +
    id +
    '&oldPassword=' +
    oldPassword +
    '&newPassword=' +
    newPassword;
  return postData(url);
}

// Change email address associated with user
export function postChangeEmail(id: string, email: string) {
  const url =
    apiDomain + '/api/utility/changeemail/' + '?id=' + id + '&email=' + email;
  return postData(url);
}

export function getAllReferences() {
  const url = apiDomain + '/api/utility/references/all';
  return getData(url);
}

export function getClaims() {
  const url = apiDomain + '/api/utility/references/claims';
  return getData(url);
}

export function getInternalContacts() {
  const url = apiDomain + '/api/utility/references/internalcontacts';
  return getData(url);
}

export function createEmailTemplate(data: {}) {
  const url = apiDomain + '/api/utility/references/emailtemplate/create';
  return postData(url, data);
}

export function updateEmailTemplate(data) {
  const url = apiDomain + '/api/utility/references/emailtemplate/update';
  return putData(url, data);
}

export function createLetterTemplate(data: {}) {
  const url = apiDomain + '/api/utility/references/lettertemplate/create';
  return postData(url, data);
}

export function updateLetterTemplate(data: {}) {
  const url = apiDomain + '/api/utility/references/lettertemplate/update';
  return putData(url, data);
}

export function createSMSTemplate(data: {}) {
  const url = apiDomain + '/api/utility/references/smstemplate/create';
  return postData(url, data);
}

export function updateSMSTemplate(data: {}) {
  const url = apiDomain + '/api/utility/references/smstemplate/update';
  return putData(url, data);
}

// Get template placeholder items (also known as merge template items in the api)
export function getTemplatePlaceholders() {
  const url = apiDomain + '/api/utility/references/mergetemplateitems';
  return getData(url);
}

// Get Rate Master List
export function getRateMaster() {
  const url = apiDomain + '/api/utility/references/ratemaster';
  return getData(url);
}

// Get Rank Master List
export function getRankMaster() {
  const url = apiDomain + '/api/utility/references/rankmaster';
  return getData(url);
}

export function getAllBeltMaster() {
  const url = apiDomain + '/api/utility/references/beltmaster/all';
  return getData(url);
}

export function getStateProvinceMaster() {
  const url = apiDomain + '/api/utility/references/stateprovincemaster';
  return getData(url);
}
