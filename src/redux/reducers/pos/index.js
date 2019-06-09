import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import orderSummary from './orderSummary';
import cart from './cart';
import students from './students';
import schoolPos from './schoolPos';
import customer from './customer';
import orderPost from './orderPost';
import posPost from './posPost';
import skuPost from './skuPost';
import studentPurchaseHistory from './studentPurchaseHistory';
import schoolPurchaseHistory from './schoolPurchaseHistory';

export const posInitialState = {
  cart: Object.assign({}, { payload: [] }),
  customer: Object.assign({}, { payload: { screen: {} } }),
  students: Object.assign({}, emptyFetchState),
  schoolPos: Object.assign({}, emptyFetchState),
  orderPost: Object.assign({}, emptyFormState),
  posPost: Object.assign({}, emptyFormState),
  skuPost: Object.assign({}, emptyFormState),
  orderSummary: Object.assign({}, { payload: {} }),
  studentPurchaseHistory: Object.assign({}, emptyFetchState),
  schoolPurchaseHistory: Object.assign({}, emptyFetchState),
};

export function posReducer(state, action) {
  return {
    cart: cart(state.cart, action),
    orderSummary: orderSummary(state.orderSummary, action),
    students: students(state.students, action),
    customer: customer(state.customer, action),
    schoolPos: schoolPos(state.schoolPos, action),
    orderPost: orderPost(state.orderPost, action),
    posPost: posPost(state.posPost, action),
    skuPost: skuPost(state.skuPost, action),
    studentPurchaseHistory: studentPurchaseHistory(
      state.studentPurchaseHistory,
      action
    ),
    schoolPurchaseHistory: schoolPurchaseHistory(
      state.schoolPurchaseHistory,
      action
    ),
  };
}
