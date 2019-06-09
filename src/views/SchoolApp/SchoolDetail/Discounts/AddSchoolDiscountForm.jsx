import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type AddSchoolDiscountFormProps = {
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
  if (!values.Value) {
    errors.Value = 'Enter Discount Rate';
  }
  if (values.Value < 0 || values.Value > 100) {
    errors.Value = 'Invalid Discount Rate';
  }
  return errors;
};

class AddSchoolDiscountForm extends React.Component {
  props: AddSchoolDiscountFormProps;
  constructor(props) {
    super(props);
    this.state = {
      discountType:
        (props.initialValues && props.initialValues.discountType) || '',
    };
  }

  onSubmit = formData => {
    formData.SchoolId = this.props.id;
    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  handleChange = (e, value) => {
    this.setState({ discountType: value });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Description" name="Description" textarea={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Type*"
            name="TypeId"
            placeholder=" "
            required={true}
            referenceOptions="LstDiscountTypes"
            value={this.state.discountType}
            onChange={this.handleChange}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Value*"
            name="Value"
            required={true}
            type="number"
            input={{ min: 0, step: '.01' }}
            percent={
              this.state.discountType === '41a05cd6-b273-4ce1-a51a-c63e9154d8e4'
                ? true
                : false
            } // Percentage
            currency={
              this.state.discountType ===
                '13ffcaec-5eb0-4ccf-90f2-f0c4e3a11b6c' || // Discounted Price
              this.state.discountType === 'b1b9e29e-1fda-49c5-b3b6-8ead06935a9c' // Final Price
                ? true
                : false
            }
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
  form: 'add-school-discounts', // a unique identifier for this form
  validate,
})(AddSchoolDiscountForm);
