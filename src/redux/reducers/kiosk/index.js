import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import anemicSchoolDetail from './anemicSchoolDetail';
import authenticate from './authenticate';
import checkin from './checkin';
import token from './token';
import findByName from './findByName';

export const kioskInitialState = {
  anemicSchoolDetail: Object.assign({}, emptyFetchState),
  authenticate: Object.assign({}, emptyFormState),
  checkin: Object.assign({}, emptyFormState),
  token: Object.assign({}, emptyFormState),
  findByName: Object.assign({}, emptyFetchState),
};

export function kioskReducer(state, action) {
  return {
    anemicSchoolDetail: anemicSchoolDetail(state.anemicSchoolDetail, action),
    authenticate: authenticate(state.authenticate, action),
    checkin: checkin(state.checkin, action),
    token: token(state.token, action),
    findByName: findByName(state.findByName, action),
  };
}
