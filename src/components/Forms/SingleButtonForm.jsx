import React from 'react';
import { reduxForm } from 'redux-form';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';
type SingleButtonFormProps = {
  title: string, // Title for the form's submit button.
  intent: string, // Intent for the button: 'primary', 'success', 'danger', etc.
  formData: string,
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

class SingleButtonForm extends React.Component {
  props: SingleButtonFormProps;

  onSubmit = formData => {
    log('SingleButtonForm POST: ', formData);
    this.props.dispatchFormPost(this.props.formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <SubmitButton
          intent={`${
            this.props.intent
              ? 'pt-intent-' + this.props.intent
              : 'pt-intent-primary'
          }`}
          className={this.props.className}
          disabled={this.props.disbled}
        >
          {this.props.title}
        </SubmitButton>
      </form>
    );
  }
}

export default reduxForm({
  form: 'single-button-form', // a unique identifier for this form
  validate,
})(SingleButtonForm);
