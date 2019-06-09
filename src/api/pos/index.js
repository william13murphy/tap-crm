import { apiDomain, getData, postData, putData } from '../_base';

export function getPoss() {
  const url = apiDomain + '/api/pos/poss';
  return getData(url);
}

export function getSchoolPos(id) {
  const url = apiDomain + '/api/pos/school/' + id;
  return getData(url);
}

export function postOrder(data: {}) {
  const url = apiDomain + '/api/pos/school/order/create';
  return postData(url, data);
}

export function getStudentPayment(id) {
  const url = apiDomain + '/api/pos/school/student/paymentoptions/' + id;
  return getData(url);
}

export function posCreate(data: {}) {
  const url = apiDomain + '/api/pos/create';
  return postData(url, data);
}

export function skuCreate(data: {}) {
  const url = apiDomain + '/api/pos/sku/create';
  return postData(url, data);
}

export function getStudentPurchaseHistory(id) {
  const url = apiDomain + '/api/pos/student/purchase/history/' + id;
  return getData(url);
}

export function getSchoolPurchaseHistory(id) {
  const url = apiDomain + '/api/pos/school/purchase/history/' + id;
  return getData(url);
}
