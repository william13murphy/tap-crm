import React from 'react';

type DeleteStudentNoteFormProps = {
  dispatchFormPost: any,
  noteId: string,
  studentId: string,
};

class DeleteStudentNoteForm extends React.Component {
  props: DeleteStudentNoteFormProps;

  componentDidMount() {
    this.props.dispatchFormPost(this.props.noteId);
  }

  render() {
    return <div />;
  }
}

export default DeleteStudentNoteForm;
