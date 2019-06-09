import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import SubmitButton from 'components/Forms/SubmitButton';

type StudentPromotionFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};

  return errors;
};

class StudentPromotionForm extends React.Component {
  props: StudentPromotionFormProps;
  onSubmit = formData => {
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form
        className="StudentPromotionForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">
            Promote Student
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const connectedStudentPromotionForm = connect(
  StudentPromotionForm,
  mapStateToProps
);

export default reduxForm({
  form: 'student-promotion-form', // a unique identifier for this form
  validate,
})(connectedStudentPromotionForm);
