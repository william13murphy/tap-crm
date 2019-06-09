import React from 'react';
import connect from 'src/redux/connect';
import { reduxForm, change } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

import './styles.less';

type EmailSendFormProps = {
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
  match: {
    params: {
      templateType: string,
    },
  },
  initialize: Function,
  allEmailTemplates: {
    payload: [],
  },
  handleEmailChange: Function,
  initialValues: {
    Subject: string,
    HtmlData: string,
  },
  selectedEmailTemplateId: string,
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

class EmailSendForm extends React.Component {
  props: EmailSendFormProps;

  onSubmit = formData => {
    delete formData.confirmEmail;
    for (let propName in formData) {
      if (formData[propName] === null || formData[propName] === undefined) {
        delete formData[propName];
      }
    }
    formData.Description = formData.Subject;
    formData.SchoolId = this.props.schoolId;
    formData.StudentIds = [this.props.studentId];
    delete formData.StudentId;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  handleEmailChange(selectedEmailTemplateId) {
    this.props.handleEmailChange(selectedEmailTemplateId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.initialize({
      Subject: nextProps.initialValues && nextProps.initialValues.Subject,
      HtmlData: nextProps.initialValues && nextProps.initialValues.HtmlData,
      TemplateId:
        nextProps.selectedEmailTemplateId && nextProps.selectedEmailTemplateId,
    });
  }

  updateFormData = newHtmlData => {
    this.props.dispatch(change('email-template', 'HtmlData', newHtmlData));
  };

  render() {
    return (
      <div className="SendEmailForm__container">
        <div className="StudentName">
          <span className="StudentName__title">Student: </span>
          <span className="StudentName__value">{this.props.studentName}</span>
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
          <InputBlock>
            <SelectField
              label="Email Templates*"
              name="TemplateId"
              required={true}
              options={
                this.props.allEmailTemplates &&
                this.props.allEmailTemplates.payload &&
                this.props.allEmailTemplates.payload.map(cV => {
                  return {
                    label: cV.Name,
                    value: cV.Id,
                  };
                })
              }
              onChange={(event, value) => this.handleEmailChange(value)}
            />
          </InputBlock>
          <InputBlock>
            <TextField label="Subject*" name="Subject" required={true} />
          </InputBlock>
          <InputBlock>
            <HTMLField
              label="Message*"
              name="HtmlData"
              placeholders={''}
              required={true}
              updateFormData={this.updateFormData}
            />
          </InputBlock>
          <div className="FormButtonsContainer">
            <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const ConnectedEmailSendForm = connect(
  EmailSendForm,
  mapStateToProps
);
export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedEmailSendForm);
