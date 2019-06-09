// import { combineReducers } from 'redux';
import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import allClients from './allClients';
import detail from './detail';
import schools from './schools';

import addressPost from './addressPost';
import contactPost from './contactPost';
import notePost from './notePost';
import clientPost from './clientPost';
import contactDelete from './contactDelete';
import clientDelete from './clientDelete';

export const clientInitialState = {
  allClients: Object.assign({}, emptyFetchState),
  detail: Object.assign({}, emptyFetchState),
  schools: Object.assign({}, emptyFetchState),
  notePost: Object.assign({}, emptyFormState),
  clientPost: Object.assign({}, emptyFormState),
  addressPost: Object.assign({}, emptyFormState),
  contactPost: Object.assign({}, emptyFormState),
  contactDelete: Object.assign({}, emptyFormState),
  clientDelete: Object.assign({}, emptyFormState),
};

export function clientReducer(state, action) {
  return {
    allClients: allClients(state.allClients, action),
    detail: detail(state.detail, action),
    schools: schools(state.schools, action),
    clientPost: clientPost(state.clientPost, action),
    addressPost: addressPost(state.addressPost, action),
    contactPost: contactPost(state.contactPost, action),
    notePost: notePost(state.notePost, action),
    contactDelete: contactDelete(state.contactDelete, action),
    clientDelete: clientDelete(state.clientDelete, action),
  };
}

// const clientReducer = combineReducers({
//   allClients,
//   detail,
//   schools,
//   addressPost,
//   contactPost,
//   notePost,
//   clientPost,
// });
