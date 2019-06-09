import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  userTaskCreate,
  userTaskUpdate,
  userTaskPostFormReset,
} from 'src/redux/actionCreators/user/taskPost';

import { myTasksFetch } from 'src/redux/actionCreators/user/myTasks';

const payloadDisplayName = 'Task';

type UserTaskFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchUserTaskCreate: any,
  dispatchUserTaskUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  update: boolean,
  initialValues: Object,
};

class UserTaskFormContainer extends React.Component {
  props: UserTaskFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchUserTaskUpdate
            : this.props.dispatchUserTaskCreate
        }
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.user.taskPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUserTaskCreate: data => {
      dispatch(userTaskCreate(data));
    },
    dispatchUserTaskUpdate: data => {
      dispatch(userTaskUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(userTaskPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(myTasksFetch(id));
    },
  };
};

export default connect(
  UserTaskFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
