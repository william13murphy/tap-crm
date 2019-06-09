import React from 'react';
import connect from 'src/redux/connect';
import { reduxForm, Field } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

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
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    delete formData.StudentId;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  updateFormData = newHtmlData => {
    this.setState({ newHtmlData });
  };

  render() {
    let studentName = '';
    return (
      <div>
        <div>Student: {`${this.props.studentName}`}</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
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
  return {
    references: state.utility.references,
    students: state.school.anemicStudents,
  };
};
const ConnectedEmailSendForm = connect(
  EmailSendForm,
  mapStateToProps
);
export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedEmailSendForm);
