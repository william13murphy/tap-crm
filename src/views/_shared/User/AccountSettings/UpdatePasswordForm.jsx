import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import PasswordRequirementsCallout from 'components/PasswordRequirementsCallout';
import passwordValidation from 'src/redux/data/passwordValidation';
import { log } from 'log';

type UpdatePasswordFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = 'Please enter your current password.';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Please enter your new password.';
  }
  if (!values.confirmNewPassword) {
    errors.confirmNewPassword =
      'Please re-enter and confirm your new password.';
  }

  if (
    !passwordValidation.lowerCaseLetterValidation.test(values.newPassword) ||
    !passwordValidation.specialCharacterValidation.test(values.newPassword) ||
    !passwordValidation.minimumCharacterLengthValidation.test(
      values.newPassword
    )
  ) {
    errors.newPassword = 'Password is not valid.';
  }

  if (values && values.newPassword) {
    if (values.newPassword != values.confirmNewPassword) {
      errors.confirmNewPassword = 'Confirmed password does not match.';
    }
  }
  return errors;
};

class UpdatePasswordForm extends React.Component {
  props: UpdatePasswordFormProps;
  constructor(props: UpdatePasswordFormProps) {
    super(props);

    this.state = {
      password: '',
      isLowerCaseLetter: false,
      isSpecialCharacter: false,
      isMinimumCharacterLength: false,
    };
  }
  onSubmit = formData => {
    log('Submit formData: ', formData);
    delete formData.confirmNewPassword;

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
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <PasswordRequirementsCallout passwordValidation={this.state} />
        <InputBlock>
          <TextField
            label="Current Password*"
            name="oldPassword"
            required={true}
            type="password"
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="New Password*"
            name="newPassword"
            required={true}
            type="password"
            onChange={(event, value) => this.handlePasswordChange(value)}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="New Password (Confirm)*"
            name="confirmNewPassword"
            required={true}
            type="password"
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
  form: 'update-password', // a unique identifier for this form
  validate,
})(UpdatePasswordForm);
