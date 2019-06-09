import { apiDomain, getData, postData, putData, deleteData } from '../_base';

export function getClientNotes(clientId: string) {
  const url = apiDomain + '/api/client/notes/' + clientId;
  return getData(url);
}

export function getClientSchools(clientId: string) {
  const url = apiDomain + '/api/client/schools/' + clientId;
  return getData(url);
}

export function getClients() {
  const url = apiDomain + '/api/client/aclients';
  return getData(url);
}

export function getClientDetail(id: string) {
  const url = apiDomain + '/api/client/' + id;
  return getData(url);
}

export function createClient(data: {}) {
  const url = apiDomain + '/api/client/create';
  return postData(url, data);
}

export function updateClient(data: {}) {
  const url = apiDomain + '/api/client/update';
  return putData(url, data);
}

export function saveClientAddress(data: {}) {
  const url = apiDomain + '/api/client/address/save';
  return postData(url, data);
}

export function saveClientContact(data: {}) {
  const url = apiDomain + '/api/client/contact/save';
  return postData(url, data);
}

export function saveClientNote(data) {
  const url = apiDomain + '/api/client/note/save';
  return postData(url, data);
}

export function deleteClientContact(id) {
  const url = apiDomain + '/api/client/contact/delete/' + id;
  return putData(url);
}

export function deleteClient(id) {
  const url = apiDomain + '/api/client/' + id;
  return deleteData(url);
}
