import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type AddSchoolPackageFormProps = {
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

class AddSchoolPackageForm extends React.Component {
  props: AddSchoolPackageFormProps;
  onSubmit = formData => {
    formData.SchoolId = this.props.id;

    if (!formData.Public) {
      formData.Public = false;
    }

    formData.ContractPeriodId = 'abe8b8d7-6911-4299-a1b0-968d99881c36';
    formData.PaymentFrequencyId = '86b72363-9989-4d45-9c58-b51c27ef26ac';

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField
            label="Name*"
            name="Name"
            id="School.Packges.AddNewPackage.Name"
            help={true}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description"
            name="Description"
            id="School.Packges.AddNewPackage.Description"
            help={true}
            textarea={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Total Price*"
            name="SuggestedPrice"
            id="School.Packges.AddNewPackage.Price"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Enrollment Fee*"
            name="SuggestedSignUpPrice"
            id="School.Packges.AddNewPackage.SignUpPrice"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Termination Fee*"
            name="SuggestedTerminationPrice"
            id="School.Packges.AddNewPackage.TerminationPrice"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Allowed Number of Members*"
            name="MaximumStudents"
            id="School.Packges.AddNewPackage.MaximumStudents"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Allowed Number of Classes Per Week*"
            name="MaximumClassesPerWeek"
            id="School.Packges.AddNewPackage.MaximumClassesPerWeek"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Allowed Number of Programs*"
            name="MaximumStyles"
            id="School.Packges.AddNewPackage.MaximumPrograms"
            help={true}
            required={true}
            type="number"
            input={{ min: 0 }}
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
  form: 'add-school-package', // a unique identifier for this form
  validate,
})(AddSchoolPackageForm);
