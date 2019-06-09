import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type LoginFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Please enter your Username.';
  }
  if (!values.password) {
    errors.password = 'Please enter your Password.';
  }
  return errors;
};

class LoginForm extends React.Component {
  props: LoginFormProps;
  onSubmit = formData => {
    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField
            label=""
            placeholder=""
            name="userName"
            required={true}
            icon="pt-icon-person"
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label=""
            placeholder=""
            name="password"
            required={true}
            type="password"
            icon="pt-icon-lock"
          />
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton className="fancy" intent="pt-intent-primary">
            Login
          </SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate,
})(LoginForm);
