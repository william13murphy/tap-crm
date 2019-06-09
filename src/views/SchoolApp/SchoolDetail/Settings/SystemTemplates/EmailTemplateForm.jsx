import React from 'react';
import connect from 'src/redux/connect';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type EmailTemplateFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  templatePlaceholders: {
    payload: [],
  },
  match: {
    params: {
      templateType: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name';
  }
  if (!values.Subject) {
    errors.Subject = 'Please enter a Subject';
  }
  if (!values.HtmlData) {
    errors.HtmlData = 'Please enter a Message';
  }
  if (!values.WellKnownTypeId) {
    errors.WellKnownTypeId = 'Please select a System Template Type';
  }

  if (values.Attachment && values.Attachment.type !== 'application/pdf') {
    errors.Attachment = 'File attachment must be pdf.';
  }
  return errors;
};

class EmailTemplateForm extends React.Component {
  props: EmailTemplateFormProps;

  onSubmit = formData => {
    delete formData.confirmEmail;

    for (let propName in formData) {
      if (formData[propName] === null || formData[propName] === undefined) {
        delete formData[propName];
      }
    }
    formData.Description = formData.Subject;
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    formData.TemplateTypeId = this.state.templateTypeId;
    formData.SchoolId = this.props.schoolId;

    if (formData.Attachment) {
      imageToBase64String(formData.Attachment).then(base64ImageString => {
        const base64Fields: {
          headerString: string,
          imageString: string,
        } = base64StringToFields(base64ImageString);

        formData.Attachments = [
          {
            Name: formData.Attachment.name,
            FileHeader: base64Fields.headerString,
            File: base64Fields.imageString,
            FileTypeId: '748b9057-3e02-42db-9f29-5a30c65f89be', // pdf
          },
        ];
        delete formData.Attachment;
        log('Submit formData w/ attachment: ', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('Submit formData: ', formData);
      this.props.dispatchFormPost(formData);
    }
  };

  componentWillMount() {
    const templateType = this.props.match.params.templateType;
    let filteredSystemTemplates;

    let items = getReferenceItemOptions(
      'LstTemplateTypes',
      this.props.references
    );

    let matched = items.find(item => item.label.toLowerCase() === templateType);

    let templatePlaceholders = this.props.templatePlaceholders.payload
      .filter(item => item.TemplateTypeId === matched.value)
      .map(item => item.Name);

    if (templateType === 'student') {
      filteredSystemTemplates = getReferenceItemOptions(
        'LstWellKnownTemplateTypesEmail',
        this.props.references
      ).filter(item => item.value === 'bafeccb9-57d1-45e8-8f7d-78e737c599e0');
    } else {
      filteredSystemTemplates = getReferenceItemOptions(
        'LstWellKnownTemplateTypesEmail',
        this.props.references
      ).filter(item => item.value !== 'bafeccb9-57d1-45e8-8f7d-78e737c599e0');
    }

    this.setState({
      templateTypeId: matched.value,
      placeholders: templatePlaceholders,
      filteredSystemTemplates: filteredSystemTemplates,
    });
  }

  updateFormData = newHtmlData => {
    this.setState({ newHtmlData });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Subject*" name="Subject" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="System Template Type*"
            name="WellKnownTypeId"
            required={true}
            options={this.state.filteredSystemTemplates}
          />
        </InputBlock>
        <InputBlock>
          <ImageField label="PDF Attachment" name="Attachment" />
        </InputBlock>
        <InputBlock>
          <HTMLField
            label="Message*"
            name="HtmlData"
            placeholders={this.state.placeholders}
            required={true}
            updateFormData={this.updateFormData}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    templatePlaceholders: state.utility.templatePlaceholders,
    references: state.utility.references,
  };
};

const ConnectedEmailTemplateForm = connect(
  EmailTemplateForm,
  mapStateToProps
);

export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedEmailTemplateForm);
