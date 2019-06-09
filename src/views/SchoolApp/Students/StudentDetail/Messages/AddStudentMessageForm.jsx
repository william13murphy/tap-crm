import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import { log } from 'log';

type AddStudentMessageFormProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.MessageTypeId) {
    errors.MessageTypeId = 'Please select a Message Type.';
  }

  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
  }
  return errors;
};

class AddStudentMessageForm extends React.Component {
  props: AddStudentMessageFormProps;
  onSubmit = formData => {
    formData['StudentId'] = this.props.studentId;
    formData['CreatedBy'] = this.props.token.payload.UserId;

    log('AddStudentMessageForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Message Type*"
            name="MessageTypeId"
            placeholder="Select a Message Type"
            referenceOptions="LstMessageTypes"
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description*"
            name="Detail"
            textarea={true}
            required={true}
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
    token: state.token,
  };
};

const connectedAddStudentMessageForm = connect(
  AddStudentMessageForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-message', // a unique identifier for this form
  validate,
})(connectedAddStudentMessageForm);
