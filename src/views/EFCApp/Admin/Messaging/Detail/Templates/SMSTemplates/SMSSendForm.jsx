import React from 'react';
import { reduxForm, change } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { getReferenceItemOptions } from 'api/referenceItems';

import connect from 'src/redux/connect';

type SMSSendFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  templateTypeId: string,
  templatePlaceholders: {
    payload: [],
  },
  students: {
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
  return errors;
};

class SMSSendForm extends React.Component {
  props: SMSSendFormProps;
  onSubmit = formData => {
    delete formData.confirmSMS;

    for (let propName in formData) {
      if (formData[propName] === null || formData[propName] === undefined) {
        delete formData[propName];
      }
    }
    formData.Description = formData.Subject;
    formData.SchoolId = this.props.schoolId;
    formData.StudentIds = [formData.StudentId];
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    delete formData.StudentId;

    this.props.dispatchFormPost(formData);
  };
  componentWillMount() {
    const templateType = this.props.match.params.templateType;
    let templateTypeId = this.props.templateTypeId;
    let items = [];
    if (!this.props.templateTypeId) {
      items = getReferenceItemOptions(
        'LstTemplateTypes',
        this.props.references
      );

      let matched = items.find(
        item => item.label.toLowerCase() === templateType.toLowerCase()
      );
      templateTypeId = matched && matched.value;
    }

    let templatePlaceholders = this.props.templatePlaceholders.payload.filter(
      item => item.TemplateTypeId === templateTypeId
    );

    const placeholders = templatePlaceholders.map(item => item.Name);

    this.setState({
      templateTypeId: items.find(item => item.value === templateType),
      placeholders: placeholders,
    });
  }

  updateFormData = newHtmlData => {
    this.props.dispatch(change('email-template', 'HtmlData', newHtmlData));
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Student*"
            name="StudentId"
            required={true}
            options={this.props.students.payload.map(cV => {
              return {
                label:
                  cV.LastName +
                  ', ' +
                  cV.FirstName +
                  ' - ' +
                  cV.SMS +
                  ' - #' +
                  cV.BarCode,
                value: cV.StudentId,
              };
            })}
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Subject*" name="Subject" required={true} />
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
    students: state.school.anemicStudents,
  };
};

const ConnectedSMSSendForm = connect(
  SMSSendForm,
  mapStateToProps
);

export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedSMSSendForm);
