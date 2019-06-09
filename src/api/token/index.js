import $ from 'jquery';
import { apiDomain } from '../_base';

// Request Login Token from API:

type loginParameters = {
  userName: string,
  password: string,
};

export function postToken({ userName, password }: loginParameters) {
  const params = {
    grant_type: 'password',
    userName: userName,
    password: password,
  };
  return $.ajax({
    url: apiDomain + '/token',
    type: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
    },
    crossDomain: true,
  });
}
