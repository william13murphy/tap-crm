import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SwitchField from 'components/Forms/SwitchField';
import { log } from 'log';

type EFCProductFormProps = {
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
  if (!values.Description) {
    errors.Description = 'Please enter a Description.';
  }
  if (!values.Cost) {
    errors.Cost = 'Please enter a Cost.';
  }

  return errors;
};

const MERCHANDISE_PRODUCT_TYPE_ID = 'c4d4627f-59d4-48d1-b4a8-bb0a1cd390d7';
const UNIT_COST_RATE_TYPE_ID = '67fcbf98-aaeb-4e8d-ad77-a35e2c45a7a6';
const USA_COUNTRY_ID = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64';

class EFCProductForm extends React.Component {
  props: EFCProductFormProps;
  onSubmit = formData => {
    formData.ProductTypeId = MERCHANDISE_PRODUCT_TYPE_ID;
    formData.RateTypeId = UNIT_COST_RATE_TYPE_ID;
    formData.CountryId = USA_COUNTRY_ID;
    formData.OnHand = 999;
    if (!formData.Taxable) {
      formData.Taxable = false;
    }
    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Description*" name="Description" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Cost*" name="Cost" required={true} currency />
        </InputBlock>
        <InputBlock>
          <SwitchField label="Taxable" name="Taxable" />
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'efc-product', // a unique identifier for this form
  validate,
})(EFCProductForm);
