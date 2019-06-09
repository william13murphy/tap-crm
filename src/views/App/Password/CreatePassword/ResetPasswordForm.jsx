import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import PostFailMessage from 'components/DataLoading/PostFailMessage';
import SubmitButton from 'components/Forms/SubmitButton';

import PasswordRequirementsCallout from 'components/PasswordRequirementsCallout';
import passwordValidation from 'src/redux/data/passwordValidation';
import { log } from 'log';

type ResetPasswordFormProps = {
  id: string,
  match: {
    params: {
      id: string,
    },
  },
  resetPassword: {
    payload: {},
    error?: boolean,
    status?: string,
  },
  dispatchFormPost: any,
  dispatchFormReset: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};

  if (
    !passwordValidation.lowerCaseLetterValidation.test(values.password) ||
    !passwordValidation.specialCharacterValidation.test(values.password) ||
    !passwordValidation.minimumCharacterLengthValidation.test(values.password)
  ) {
    errors.password = 'Password is not valid.';
  }

  if (values && values.password) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = 'Password values must match.';
    } else {
    }
  }
  return errors;
};

class ResetPasswordForm extends React.Component {
  props: ResetPasswordFormProps;
  constructor(props: ResetPasswordForm) {
    super(props);

    this.state = {
      password: '',
      isLowerCaseLetter: false,
      isSpecialCharacter: false,
      isMinimumCharacterLength: false,
    };
  }
  onSubmit = formData => {
    formData.id = this.props.id;
    delete formData.confirmPassword;
    log('ResetPasswordForm onSubmit - formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  handlePasswordChange = value => {
    this.setState({
      isLowerCaseLetter: passwordValidation.lowerCaseLetterValidation.test(
        value
      ),
      isSpecialCharacter: passwordValidation.specialCharacterValidation.test(
        value
      ),
      isMinimumCharacterLength: passwordValidation.minimumCharacterLengthValidation.test(
        value
      ),
    });
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="ResetPasswordForm">
        <form onSubmit={handleSubmit(this.onSubmit)} method="POST">
          <PasswordRequirementsCallout
            resetPasswordform={true}
            passwordValidation={this.state}
          />
          <InputBlock>
            <TextField
              label="New Password"
              name="password"
              required={true}
              type="password"
              onChange={(event, value) => this.handlePasswordChange(value)}
            />
          </InputBlock>
          <InputBlock>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              required={true}
              type="password"
            />
          </InputBlock>

          <div className="FormButtonsContainer">
            <SubmitButton className="fancy" intent="pt-intent-primary">
              Submit
            </SubmitButton>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'reset-password', // a unique identifier for this form
  validate,
})(ResetPasswordForm);
