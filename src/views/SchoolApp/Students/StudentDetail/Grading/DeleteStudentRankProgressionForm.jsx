import React from 'react';

type DeleteStudentRankProgressionFormProps = {
  dispatchFormPost: any,
  progressionId: string,
  studentId: string,
};

class DeleteStudentRankProgressionForm extends React.Component {
  props: DeleteStudentRankProgressionFormProps;

  componentDidMount() {
    // this.props.dispatchFormPost(this.props.progressionId);
  }

  render() {
    return <div />;
  }
}

export default DeleteStudentRankProgressionForm;
