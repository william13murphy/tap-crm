import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';

import SelectField from 'components/Forms/SelectField';
import SwitchField from 'components/Forms/SwitchField';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type AddSchoolStyleFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  return errors;
};

class AddSchoolStyleForm extends React.Component {
  props: AddSchoolStyleFormProps;
  onSubmit = formData => {
    formData.SchoolId = this.props.id;

    formData.StyleTypeId = 'bc2e4f0c-22b9-48ce-90cf-67cfa9535797'; // Martial Arts
    formData.Public = true; //'Public':true

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description"
            name="Description"
            required={true}
            textarea={true}
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
  form: 'add-school-style', // a unique identifier for this form
  validate,
})(AddSchoolStyleForm);
