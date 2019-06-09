import React from 'react';
import connect from 'src/redux/connect';
import UserTasksContainer from 'containers/User/UserTasksContainer';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ConfirmDialog from 'components/ConfirmDialog';
import Modal from 'components/Modal';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import TaskList from './TaskList';

type TasksPageProps = {
  references: string,
  myTasks: {},
  history: {},
};

const Tasks = (props: TasksPageProps) => {
  return (
    <Page className="TasksPage" title="Tasks">
      <PageHeader>
        <PageTitle>All Tasks</PageTitle>
      </PageHeader>
      <PageBody>
        <SchoolUtilityStaffsContainer
          dispatchFetchParams={props.appContext && props.appContext.schoolId}
        >
          <UserTasksContainer>
            <TaskList
              showAll
              data={props.myTasks}
              references={props.references}
              history={props.history}
            />
          </UserTasksContainer>
        </SchoolUtilityStaffsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    myTasks: state.user.myTasks,
    references: state.utility.references,
    appContext: state.appContext,
  };
};

export default connect(
  Tasks,
  mapStateToProps
);
