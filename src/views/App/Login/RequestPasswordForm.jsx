import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type RequestPasswordFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Please enter your User Name or Email Address.';
  }
  return errors;
};

class RequestPasswordForm extends React.Component {
  props: RequestPasswordFormProps;

  onSubmit = formData => {
    log('RequestPasswordResetForm onSubmit - formData: ', formData);
    formData.noAuth = true;
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField
            label="UserName*"
            name="userName"
            required={true}
            placeholder={false}
          />
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'request-password', // a unique identifier for this form
  validate,
})(RequestPasswordForm);
