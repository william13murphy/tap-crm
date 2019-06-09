import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';
type UpdateEmailFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter your new Email Address.';
  }

  if (values && values.email) {
    if (values.email != values.confirmEmail) {
      errors.confirmEmail = 'Please confirm your Email Address.';
    }
  }
  return errors;
};

class UpdateEmailForm extends React.Component {
  props: UpdateEmailFormProps;
  onSubmit = formData => {
    log('Submit formData: ', formData);
    delete formData.confirmEmail;
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="New Email" name="email" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="New Email (Confirm)"
            name="confirmEmail"
            required={true}
          />
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Login</SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'update-email',
  validate,
})(UpdateEmailForm);
