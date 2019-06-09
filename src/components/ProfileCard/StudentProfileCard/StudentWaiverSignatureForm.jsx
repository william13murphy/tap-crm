import React from 'react';
import { reduxForm } from 'redux-form';
import SignatureField from 'components/Forms/SignatureField';
import SubmitButton from 'components/Forms/SubmitButton';

import { base64StringToFields } from 'src/util/base64';
import { log } from 'log';
type StudentWaiverSignatureFormProps = {
  title: string, // Title for the form's submit button.
  intent: string, // Intent for the button: 'primary', 'success', 'danger', etc.
  initialValues: string, // All formData is passed in as initialValues.
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  planId: string,
};

const validate = values => {
  const errors = {};

  return errors;
};

class StudentWaiverSignatureForm extends React.Component {
  props: StudentWaiverSignatureFormProps;
  onSubmit = formData => {
    const signatureFields = base64StringToFields(formData.SignatureField);
    delete formData.SignatureField;
    formData['Signature'] = signatureFields.imageString;
    formData['SignatureHeader'] = signatureFields.headerString;
    formData['StudentId'] = this.props.studentId;

    log('StudentWaiverSignatureForm POST >>>', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form
        className="StudentWaiverSignatureForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <div className="FormButtonsContainer">
          <SignatureField name="SignatureField" />
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
})(StudentWaiverSignatureForm);
