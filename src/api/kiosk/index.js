import {
  kioskApiDomain,
  apiDomain,
  getData,
  postData,
  putData,
} from '../_base';
import $ from 'jquery';

// Get admic school for kiosk. Using Main api domain, but for Kiosk only.
export function getKioskAnemicSchoolDetail(schoolId) {
  const url = apiDomain + '/api/values/aschool/' + schoolId;
  return getData(url);
}

export function postKioskAuthenticate(data: {}) {
  const url = kioskApiDomain + '/api/kiosk/authenticate';
  return postData(url, data);
}

export function postKioskCheckin(data: {}) {
  const url = kioskApiDomain + '/api/kiosk/checkin';
  return postData(url, data);
}

export function getKioskFindByName(schoolId) {
  const url =
    kioskApiDomain + '/api/kiosk/findbyname?schoolId=' + schoolId + '&name=';
  return getData(url);
}

// Request Login Token from API:

type loginParameters = {
  userName: string,
  password: string,
};

export function postKioskToken({ userName, password }: loginParameters) {
  const params = {
    grant_type: 'password',
    userName: userName,
    password: password,
  };
  return $.ajax({
    url: kioskApiDomain + '/token',
    type: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
    },
    crossDomain: true,
  });
}
