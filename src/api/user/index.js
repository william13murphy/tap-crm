import { apiDomain, getData, postData, putData, deleteData } from '../_base';

// Fetch logged-in user's User object (My Profile)
export function getUserMe() {
  const url = apiDomain + '/api/user/me';
  return getData(url);
}

export function updateMyUser(data: {}) {
  const url = apiDomain + '/api/user/update';
  return putData(url, data);
}

export function getUserMyTasks(id: string) {
  const url = apiDomain + '/api/user/mytasks/' + id;
  return getData(url);
}

export function createUserTask(data: {}) {
  const url = apiDomain + '/api/user/task/create';
  return postData(url, data);
}

export function updateUserTask(data: {}) {
  const url = apiDomain + '/api/user/task/update';
  return putData(url, data);
}

export function createUserAppointment(data: {}) {
  const url = apiDomain + '/api/user/appointment/create';
  return postData(url, data);
}

export function updateUserAppointment(data: {}) {
  const url = apiDomain + '/api/user/appointment/update';
  return putData(url, data);
}

export function getUserMyAppointments(userId: string) {
  const url = apiDomain + '/api/user/myappointments/' + userId;
  return getData(url);
}

export function getUserAppointmentDetail(id: string) {
  const url = apiDomain + '/api/user/appointment/' + id;
  return getData(url);
}

export function deleteUser(id: string) {
  const url = apiDomain + '/api/user/deleteuser/' + id;
  return deleteData(url);
}
