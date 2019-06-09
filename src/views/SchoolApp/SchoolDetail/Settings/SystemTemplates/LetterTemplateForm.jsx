import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import connect from 'src/redux/connect';
import { getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type LetterTemplateFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: any,
  templatePlaceholders: {
    payload: [],
  },
};

const validate = values => {
  const errors = {};

  if (!values.Name) {
    errors.Name = 'Please enter a Name';
  }
  if (!values.Description) {
    errors.Description = 'Please enter a Description';
  }
  if (!values.PageSizeId) {
    errors.PageSizeId = 'Please select a Page Size';
  }
  if (!values.WellKnownTypeId) {
    errors.WellKnownTypeId = 'Please select a System Template Type';
  }
  if (!values.HtmlData) {
    errors.HtmlData = 'Please enter a Message';
  }
  return errors;
};

const marginSizes = [
  {
    label: '1"',
    value: 1,
  },
  {
    label: '2"',
    value: 2,
  },
  {
    label: '3"',
    value: 3,
  },
];

class LetterTemplateForm extends React.Component {
  props: LetterTemplateFormProps;

  onSubmit = formData => {
    delete formData.confirmEmail;

    formData.SchoolId = this.props.schoolId;
    formData.TemplateTypeId = this.state.templateTypeId;
    formData.FileTypeId = '748b9057-3e02-42db-9f29-5a30c65f89be'; // pdf from LstFileTypes
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  componentWillMount() {
    const templateType = this.props.match.params.templateType;
    let filteredSystemTemplates;

    let items = getReferenceItemOptions(
      'LstTemplateTypes',
      this.props.references
    );

    let matched = items.find(
      item => item.label.toLowerCase() === templateType.toLowerCase()
    );

    let templatePlaceholders = this.props.templatePlaceholders.payload
      .filter(item => item.TemplateTypeId === matched.value)
      .map(item => item.Name);

    if (templateType === 'student') {
      filteredSystemTemplates = getReferenceItemOptions(
        'LstWellKnownTemplateTypesLetter',
        this.props.references
      ).filter(item => item.value === 'fccfd99f-ffe1-40ec-951c-a85868a5fb8f');
    } else {
      filteredSystemTemplates = getReferenceItemOptions(
        'LstWellKnownTemplateTypesLetter',
        this.props.references
      ).filter(item => item.value !== 'fccfd99f-ffe1-40ec-951c-a85868a5fb8f');
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
          <TextField label="Description*" name="Description" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Page Size*"
            name="PageSizeId"
            placeholder=" "
            required={true}
            referenceOptions="LstPageSize"
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Top Margin"
            name="MarginTop"
            placeholder="None"
            options={marginSizes}
          />
          <SelectField
            label="Bottom Margin"
            name="MarginBottom"
            placeholder="None"
            options={marginSizes}
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Left Margin"
            name="MarginLeft"
            placeholder="None"
            options={marginSizes}
          />
          <SelectField
            label="Right Margin"
            name="MarginRight"
            placeholder="None"
            options={marginSizes}
          />
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
    references: state.utility.references,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

const ConnectedLetterTemplateForm = connect(
  LetterTemplateForm,
  mapStateToProps
);

export default reduxForm({
  form: 'letter-template', // a unique identifier for this form
  validate,
})(ConnectedLetterTemplateForm);
