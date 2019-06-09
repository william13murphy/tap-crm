import React from 'react';
import { reduxForm } from 'redux-form';
import SignatureField from 'components/Forms/SignatureField';
import SubmitButton from 'components/Forms/SubmitButton';
import { base64StringToFields } from 'src/util/base64';
import { log } from 'log';

type PlanPaymentAuthorizationSignatureFormProps = {
  title: string, // Title for the form's submit button.
  intent: string, // Intent for the button: 'primary', 'success', 'danger', etc.
  initialValues: string, // All formData is passed in as initialValues.
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  planId: string,
  plan: any,
};

const validate = values => {
  const errors = {};

  return errors;
};

class PlanPaymentAuthorizationSignatureForm extends React.Component {
  props: PlanPaymentAuthorizationSignatureFormProps;

  onSubmit = formData => {
    const signatureFields = base64StringToFields(formData.SignatureField);
    delete formData.SignatureField;
    let signatureData = {};

    signatureData['Signature'] = signatureFields.imageString;
    signatureData['SignatureHeader'] = signatureFields.headerString;
    signatureData['PlanId'] = this.props.planId;
    formData['signatureData'] = signatureData;

    log('PlanPaymentAuthorizationSignatureForm POST: ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form
        className="PlanPaymentAuthorizationSignatureForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <div className="FormButtonsContainer">
          <SignatureField
            label="Sign and then Click Submit"
            name="SignatureField"
          />
          <SubmitButton
            intent={`${
              this.props.intent
                ? 'pt-intent-' + this.props.intent
                : 'pt-intent-primary'
            }`}
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'plan-payment-signature-form', // a unique identifier for this form
  validate,
})(PlanPaymentAuthorizationSignatureForm);
