import React from 'react';

import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import AddUserTaskForm from './AddUserTaskForm';
import UserTaskFormContainer from 'containers/User/UserTaskFormContainer';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import './styles.less';

type TasksModuleProps = {
  history: {},
  match: {
    path: string,
    params: {
      schoolId: string,
    },
  },
  userId: string,
  location: Object,
  schoolId: string,
  utilityStaffs: Array<{}>,
  allTaskList: string,
};

const TasksModule = (props: TasksModuleProps) => {
  let title = 'Add New Task';

  let initialValues = {
    TaskStatusTypeId: 'f808b6f3-c0ca-4094-b209-6e26a39c0c64',
  };
  let update = false;

  if (props.location && props.location.state) {
    title = 'Edit User Task';
    update = true;

    if (props.location.state.taskDetail) {
      initialValues = props.location.state.taskDetail;
    }
  }

  const schoolId = props.match.params.schoolId || props.schoolId;

  const CLOSE_URL = `/app/school-app/${schoolId}/dashboard/today`;
  const ALL_TASKLIST_CLOSE_URL = '/app/user/all-tasks';

  return (
    <Modal
      title={title}
      closeUrl={props.allTaskList ? ALL_TASKLIST_CLOSE_URL : CLOSE_URL}
    >
      <UserTaskFormContainer
        update={update}
        initialValues={initialValues}
        dispatchActionOnCloseParams={props.userId}
        redirectOnSuccess={
          props.allTaskList ? ALL_TASKLIST_CLOSE_URL : CLOSE_URL
        }
      >
        <AddUserTaskForm
          userId={props.userId}
          utilityStaffs={props.utilityStaffs}
        />
      </UserTaskFormContainer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.token.payload.UserId,
    utilityStaffs: state.school.utilityStaffs,
  };
};

export default connect(TasksModule, mapStateToProps);
