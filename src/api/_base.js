import $ from 'jquery';
import { getTokenFromStore } from 'util/token';
import { log } from 'log';

// TODO: Import these variables directly, from util/environment/api to api modules:
export { apiDomain, kioskApiDomain } from 'util/environment/api';

export function getData(url, noToken) {
  log('%cGET%c', 'color: blue', 'color: black', url);
  let headers = {
    'Content-Type': 'application/json',
  };
  if (!noToken) {
    const access_token = getTokenFromStore();
    headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    };
  }
  return $.ajax({
    url: url,
    type: 'GET',
    headers: headers,
    crossDomain: true,
  });
}

// postData:
//  noToken: Optional; No token needed for this request.
export function postData(url, data, noToken) {
  const formData = JSON.stringify(data);
  log('%cPOST%c', 'color: blue', 'color: black', url, data, formData);
  let headers = {
    'Content-Type': 'application/json',
  };
  if (!noToken) {
    const access_token = getTokenFromStore();
    headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    };
  }

  return $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    headers: headers,
    crossDomain: true,
    //async: false,
  });
}
export function postBlobData(url, data) {
  const formData = JSON.stringify(data);
  const access_token = getTokenFromStore();
  return $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    xhrFields: {
      responseType: 'blob', // VERY IMPORTANT
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/pdf',
      Authorization: 'Bearer ' + access_token,
    },
    crossDomain: true,
  });
}

// Change the name of this function
export function getPdfBlobData(url) {
  const access_token = getTokenFromStore();
  return $.ajax({
    url: url,
    type: 'GET',
    xhrFields: {
      responseType: 'blob', // VERY IMPORTANT
    },
    headers: {
      'Content-Type': 'application/pdf',
      Authorization: 'Bearer ' + access_token,
    },
    crossDomain: true,
  });
}

export function putData(url, data) {
  const access_token = getTokenFromStore();
  if (data) {
    const formData = JSON.stringify(data);
    log('%cPUT%c', 'color: blue', 'color: black', url, data, formData);
    return $.ajax({
      url: url,
      type: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      crossDomain: true,
    });
  } else {
    log('PUT >>>', url);
    return $.ajax({
      url: url,
      type: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      crossDomain: true,
    });
  }
}

//Used with api/report/eom/excel endpoint
export function getBlobData(url, data) {
  const access_token = getTokenFromStore();
  return $.ajax({
    url: url,
    type: 'GET',
    xhrFields: {
      responseType: 'blob', // VERY IMPORTANT
    },
    headers: {
      'Content-Type': 'application/ocetet-stream',
      Accept:
        '	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: 'Bearer ' + access_token,
    },
    crossDomain: true,
  });
}

export function deleteData(url) {
  const access_token = getTokenFromStore();
  log('%cDELETE%c', 'color: blue', 'color: black', url);
  return $.ajax({
    url: url,
    type: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    crossDomain: true,
  });
}
