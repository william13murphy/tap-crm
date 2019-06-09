import React from 'react';

type DeleteStudentContactFormProps = {
  dispatchFormPost: any,
  noteId: string,
  studentId: string,
};

class DeleteStudentContactForm extends React.Component {
  props: DeleteStudentContactFormProps;

  componentDidMount() {
    this.props.dispatchFormPost(this.props.noteId);
  }

  render() {
    return <div />;
  }
}

export default DeleteStudentContactForm;
