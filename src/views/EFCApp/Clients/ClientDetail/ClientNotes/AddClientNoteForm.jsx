import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import { log } from 'log';

type AddClientNoteFormProps = {
  clientId: string,
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

  if (!values.NoteTypeId) {
    errors.NoteTypeId = 'Please select a Note Type.';
  }
  if (!values.Title) {
    errors.Title = 'Please enter a Title.';
  }
  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
  }
  return errors;
};

class AddClientNoteForm extends React.Component {
  props: AddClientNoteFormProps;
  onSubmit = formData => {
    formData['ClientId'] = this.props.clientId;
    formData['CreatedBy'] = this.props.token.payload.UserId;

    log('AddClientNoteForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Note Type*"
            name="NoteTypeId"
            placeholder="Select a Note Type"
            referenceOptions="LstClientNoteTypes"
          />
        </InputBlock>

        <InputBlock>
          <TextField label="Title*" name="Title" required={true} />
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

const connectedAddClientNoteForm = connect(
  AddClientNoteForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-client-note', // a unique identifier for this form
  validate,
})(connectedAddClientNoteForm);
