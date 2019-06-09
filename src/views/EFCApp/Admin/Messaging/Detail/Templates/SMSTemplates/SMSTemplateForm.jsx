import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import { roles } from 'util/auth/roles';
import { getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type SMSTemplateFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  dispatchAllSMSTemplatesReset: Function,
  dispatchAllEmailTemplatesReset: Function,
  dispatchAllLetterTemplatesReset: Function,
  role: string,
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.TemplateTypeId) {
    errors.TemplateTypeId = 'Please select a Template Type.';
  }
  if (!values.Subject) {
    errors.Subject = 'Please enter a Subject.';
  }
  if (!values.HtmlData) {
    errors.HtmlData = 'Please enter a Message.';
  }

  return errors;
};

class SMSTemplateForm extends React.Component {
  props: SMSTemplateFormProps;

  constructor(props) {
    super(props);
    this.state = {
      templateTypes: [],
    };
  }

  onSubmit = formData => {
    formData.Description = formData.Subject;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  componentDidMount() {
    if (this.state.templateTypes.length === 0) {
      let templateTypes = getReferenceItemOptions(
        'LstTemplateTypes',
        this.props.references
      );

      if (this.props.role === roles.SCHADMIN) {
        templateTypes = [templateTypes[1], templateTypes[2]]; //"LstTemplateTypes": ['Student','Billing']
      }

      this.setState({ templateTypes });
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Template Type*"
            name="TemplateTypeId"
            placeholder="Select a Template Type"
            options={this.state.templateTypes}
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Subject*" name="Subject" required={false} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Message*"
            name="HtmlData"
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
  form: 'sms-template', // a unique identifier for this form
  validate,
})(SMSTemplateForm);
