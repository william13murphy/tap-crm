import { emptyFetchState, emptyFormState } from 'src/redux/emptyState';

import me from './me';
import myUserPost from './myUserPost';
import myTasks from './myTasks';
import taskPost from './taskPost';
import appointmentPost from './appointmentPost';
import myAppointments from './myAppointments';
import appointmentDetail from './appointmentDetail';
import userDelete from './userDelete';

export const userInitialState = {
  me: Object.assign({}, emptyFetchState),
  myUserPost: Object.assign({}, emptyFormState),
  myTasks: Object.assign({}, emptyFetchState),
  taskPost: Object.assign({}, emptyFormState),
  appointmentPost: Object.assign({}, emptyFormState),
  myAppointments: Object.assign({}, emptyFetchState),
  appointmentDetail: Object.assign({}, emptyFetchState),
  userDelete: Object.assign({}, emptyFormState),
};

export function userReducer(state, action) {
  return {
    me: me(state.me, action),
    myUserPost: myUserPost(state.myUserPost, action),
    myTasks: myTasks(state.myTasks, action),
    taskPost: taskPost(state.taskPost, action),
    appointmentPost: appointmentPost(state.appointmentPost, action),
    myAppointments: myAppointments(state.myAppointments, action),
    appointmentDetail: appointmentDetail(state.appointmentDetail, action),
    userDelete: userDelete(state.userDelete, action),
  };
}
