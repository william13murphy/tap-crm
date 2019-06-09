import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import { createUserTask, updateUserTask } from 'src/api/user';

import { myTasksFetch } from 'src/redux/actionCreators/user/myTasks';

const payloadDisplayName = 'Task Completion';

type FormContainerProps = {
  children: React.DOMElement<any>,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  // redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};
class TaskCompletionStatefulFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={this.props.update ? updateUserTask : createUserTask}
        {...this.props}
      />
    );
  }
}

// Need to mapStateToProps even though it is not used:
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: data => {
      dispatch(myTasksFetch(data));
    },
  };
};

export default connect(
  TaskCompletionStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
