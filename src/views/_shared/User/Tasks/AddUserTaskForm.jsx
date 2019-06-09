import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import DateField from 'components/Forms/DateField';
import { log } from 'log';

type AddUserTaskFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  change: Function,
  userId: string,
  taskDetail: {
    Id: string,
    Title: string,
    Description: string,
    DateCompleted: string,
    TaskTypeId: string,
    TaskStatusTypeId: string,
  },
  utilityStaffs: Array<{}>,
};

const validate = values => {
  const errors = {};
  if (!values.Title) {
    errors.Title = 'Please enter a Name.';
  }

  if (!values.TaskTypeId) {
    errors.TaskTypeId = 'Please select a Type';
  }
  if (!values.TaskStatusTypeId) {
    errors.TaskStatusTypeId = 'Please select a Status';
  }

  return errors;
};

class AddUserTaskForm extends React.Component {
  props: AddUserTaskFormProps;

  constructor() {
    super();
  }

  onSubmit = formData => {
    if (!formData.Description) {
      formData.Description = '.';
    }
    formData.CreatedBy = this.props.userId;
    formData.AssignedTo = formData.AssignedTo || this.props.userId;
    formData.DueDate = moment
      .utc(formData.DueDate)
      .startOf('day')
      .format();

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Title*" name="Title" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Description" name="Description" textarea={true} />
        </InputBlock>
        <InputBlock>
          <DateField
            label="Due Date*"
            name="DueDate"
            placeholder="Select a Due Date"
            position="right"
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Type*"
            name="TaskTypeId"
            placeholder="Select a Type"
            referenceOptions="LstTaskTypes"
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Status*"
            name="TaskStatusTypeId"
            placeholder="Select a Status"
            referenceOptions="LstTaskStatusTypes"
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            {...this.props}
            label="Assign To"
            name="AssignedTo"
            placeholder="Assign"
            options={
              this.props.utilityStaffs &&
              this.props.utilityStaffs.payload &&
              this.props.utilityStaffs.payload.map(staff => {
                return {
                  label: staff.Name,
                  value: staff.UserId,
                };
              })
            }
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
  form: 'add-user-tasks', // a unique identifier for this form
  validate,
})(AddUserTaskForm);
