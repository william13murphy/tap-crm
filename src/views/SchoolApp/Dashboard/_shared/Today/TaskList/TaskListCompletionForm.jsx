import React from 'react';
import { reduxForm } from 'redux-form';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type TaskListCompletionFormProps = {
  title: string, // Title for the form's submit button.
  intent: string, // Intent for the button: 'primary', 'success', 'danger', etc.
  initialValues: string, // All formData is passed in as initialValues.
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};
  return errors;
};

class TaskListCompletionForm extends React.Component {
  props: TaskListCompletionFormProps;
  onSubmit = formData => {
    log('TaskListCompletionForm POST: ', formData);
    this.props.dispatchFormPost(this.props.initialValues);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary" className="pt-icon-tick">
            {this.props.title}
          </SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'task-list-completion-form', // a unique identifier for this form
  validate,
})(TaskListCompletionForm);
