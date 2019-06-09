import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import adminLog from './adminLog';
import allMessageTemplates from './allMessageTemplates';
import allProducts from './allProducts';
import productPost from './productPost';
import companyInformation from './companyInformation';
import changeEmail from './changeEmail';
import changePassword from './changePassword';
import requestPassword from './requestPassword';
import resetPassword from './resetPassword';
import validatePasswordRequest from './validatePasswordRequest';
import references from './references';
import templateEmailPost from './templateEmailPost';
import templateLetterPost from './templateLetterPost';
import templateSMSPost from './templateSMSPost';
import templatePlaceholders from './templatePlaceholders';
import rateMaster from './rateMaster';
import allBeltMaster from './allBeltMaster';
import stateProvinceMaster from './stateProvinceMaster';

export const utilityInitialState = {
  references: Object.assign({}, emptyFetchState),
  adminLog: Object.assign({}, emptyFetchState),
  allMessageTemplates: Object.assign({}, emptyFetchState),
  allProducts: Object.assign({}, emptyFetchState),
  productPost: Object.assign({}, emptyFormState),
  companyInformation: Object.assign({}, emptyFetchState),
  changeEmail: Object.assign({}, emptyFormState),
  changePassword: Object.assign({}, emptyFormState),
  requestPassword: Object.assign({}, emptyFormState),
  resetPassword: Object.assign({}, emptyFormState),
  validatePasswordRequest: Object.assign({}, emptyFetchState),
  templateEmailPost: Object.assign({}, emptyFormState),
  templateLetterPost: Object.assign({}, emptyFormState),
  templateSMSPost: Object.assign({}, emptyFormState),
  templatePlaceholders: Object.assign({}, emptyFetchState),
  rateMaster: Object.assign({}, emptyFetchState),
  allBeltMaster: Object.assign({}, emptyFetchState),
  stateProvinceMaster: Object.assign({}, emptyFetchState),
};

export function utilityReducer(state, action) {
  return {
    references: references(state.references, action),
    adminLog: adminLog(state.adminLog, action),
    allMessageTemplates: allMessageTemplates(state.allMessageTemplates, action),
    allProducts: allProducts(state.allProducts, action),
    productPost: productPost(state.productPost, action),
    companyInformation: companyInformation(state.companyInformation, action),
    changeEmail: changeEmail(state.changeEmail, action),
    changePassword: changePassword(state.changePassword, action),
    requestPassword: requestPassword(state.requestPassword, action),
    resetPassword: resetPassword(state.resetPassword, action),
    validatePasswordRequest: validatePasswordRequest(
      state.validatePasswordRequest,
      action
    ),
    templateEmailPost: templateEmailPost(state.templateEmailPost, action),
    templateLetterPost: templateLetterPost(state.templateLetterPost, action),
    templateSMSPost: templateSMSPost(state.templateSMSPost, action),
    templatePlaceholders: templatePlaceholders(
      state.templatePlaceholders,
      action
    ),
    rateMaster: rateMaster(state.rateMaster, action),
    allBeltMaster: allBeltMaster(state.allBeltMaster, action),
    stateProvinceMaster: stateProvinceMaster(state.stateProvinceMaster, action),
  };
}
