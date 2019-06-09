import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import SubmitButton from 'components/Forms/SubmitButton';
import { imageToBase64String, base64StringToFields } from 'util/base64';
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
    formData.StudentIds = [this.props.studentId];
    delete formData.StudentId;
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <div>
        <div>Student: {`${this.props.studentName}`}</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
          <InputBlock />
          <InputBlock>
            <TextField label="Subject*" name="Subject" required={true} />
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
const ConnectedSMSSendForm = connect(
  SMSSendForm,
  mapStateToProps
);
export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedSMSSendForm);
