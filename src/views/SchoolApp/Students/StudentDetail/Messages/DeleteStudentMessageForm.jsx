import React from 'react';

type DeleteStudentMessageFormProps = {
  dispatchFormPost: any,
  messageId: string,
  studentId: string,
};

class DeleteStudentMessageForm extends React.Component {
  props: DeleteStudentMessageFormProps;

  componentDidMount() {
    this.props.dispatchFormPost(this.props.messageId);
  }

  render() {
    return <div />;
  }
}

export default DeleteStudentMessageForm;
