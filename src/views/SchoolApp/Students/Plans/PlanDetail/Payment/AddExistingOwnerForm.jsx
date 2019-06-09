import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type AddExistingOwnerFormProps = {
  planId: string,
  schoolId: string,
  owners: Array<{}>,
  createdBy: string,
};

const validate = values => {
  const errors = {};

  if (!values.Id) {
    errors.FirstName = 'Please select a owner.';
  }

  return errors;
};

class AddExistingOwnerForm extends React.Component {
  props: AddExistingOwnerFormProps;

  onSubmit = formData => {
    formData.PlanId = this.props.planId;
    let ownerDetails = {};
    this.props.owners.payload.map(cV => {
      if (cV.Id === formData.Id) {
        ownerDetails = cV;
      }
    });
    const newFormData = Object.assign(formData, ownerDetails);
    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form
        className="AddExistingOwnerForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <SelectField
            label="Owner*"
            name="Id"
            required={true}
            options={this.props.owners.payload.map(cV => {
              return {
                label: cV.LastName + ', ' + cV.FirstName,
                value: cV.Id,
              };
            })}
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
  form: 'add-existing-owner-form', // a unique identifier for this form
  validate,
})(AddExistingOwnerForm);
