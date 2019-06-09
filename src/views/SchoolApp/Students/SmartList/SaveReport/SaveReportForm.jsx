import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type SaveReportFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};

  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }

  return errors;
};

class SaveReportForm extends React.Component {
  props: SaveReportFormProps;

  onSubmit = formData => {
    formData.SchoolId = this.props.match.params.schoolId;
    //Data passed from SmartListFilterForm is being saved with the report
    formData.FilterJson = this.props.location.state.filters;

    //default field data
    formData.ReportTypeId = '3d08a2f5-9a66-411e-bb7d-eeaac92b9b3c';
    formData.Description = formData.Description || '';

    log('obSubmit formData:', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <TextField
          name="Name"
          label="Name*"
          placeholder="Enter a Report Name"
          required={true}
        />
        <TextField name="Description" label="Description" type="textarea" />

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

SaveReportForm = reduxForm({
  form: 'saveReport', // a unique identifier for this form
  validate,
})(SaveReportForm);

const mapStateToProps = () => ({});

export default connect(
  SaveReportForm,
  mapStateToProps
);
