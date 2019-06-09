import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type AddExistingSchoolStudentFormProps = {
  studentPlanId: string,
  students: Array<{}>,
  createdBy: string,
};

const validate = values => {
  const errors = {};

  if (!values.StudentId) {
    errors.FirstName = 'Please select a student.';
  }

  return errors;
};

class AddExistingSchoolStudentForm extends React.Component {
  props: AddExistingSchoolStudentFormProps;
  componentDidMount() {
    if (this.props.initialValues && this.props.initialValues.StudentId) {
      const formData = {};
      formData.PlanId = this.props.studentPlanId;
      formData.CreatedBy = this.props.createdBy;
      formData.StudentId = this.props.initialValues.StudentId;

      this.props.dispatchFormPost(formData);
    }
  }
  onSubmit = formData => {
    formData.PlanId = this.props.studentPlanId;
    formData.CreatedBy = this.props.createdBy;

    log('onSubmit formData', JSON.stringify(formData));
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form
        className="AddExistingStudentForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
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
                  cV.Email +
                  ' - #' +
                  cV.BarCode,
                value: cV.StudentId,
              };
            })}
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
  form: 'add-existing-school-student', // a unique identifier for this form
  validate,
})(AddExistingSchoolStudentForm);
