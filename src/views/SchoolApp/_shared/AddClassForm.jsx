import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import DateField from 'components/Forms/DateField';
import TimeField from 'components/Forms/TimeField';
import ProgramSelectField from 'components/Forms/ConnectedFields/ProgramSelectField';
import StaffSelectField from 'components/Forms/ConnectedFields/StaffSelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import {
  getTimeZoneLabel,
  calculateUTCDateTimeFromLocalDateAndTime,
} from 'src/util/localization/timezone';
import { log } from 'log';

type AddClassFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  initialValues: any,
};

const validate = values => {
  const errors = {};

  let currentDate = moment().startOf('day');
  let currentTimeStamp = moment().format('HH:mm:ss');
  let startDate = moment(values.StartDate).startOf('day');
  let startTime = moment(values.StartTime).format('HH:mm:ss');
  let startTimeOnly = moment(values.StartTime).format('HH:mm:ss');
  let endTime = moment(values.EndTime).format('HH:mm:ss');

  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }

  if (!values.Instructor) {
    errors.Instructor = 'Please select an Instructor.';
  }

  if (!values.SchoolStyleId) {
    errors.SchoolStyleId = 'Please select a Program.';
  }

  if (!values.MaximumStudents) {
    errors.MaximumStudents = 'Please enter Maximum Students.';
  }

  if (!values.StartDate) {
    errors.StartDate = 'Please select a Start Date.';
  } else if (!moment(values.StartDate).isSameOrAfter(currentDate)) {
    errors.StartDate = 'Start Date must be in future';
  }

  if (values.EndDate) {
    if (!moment(values.EndDate).isSameOrAfter(startDate)) {
      errors.EndDate = 'End Date can not be less then start date';
    }
  }

  if (!values.StartTime) {
    errors.StartTime = 'Please select a Start Time.';
  } else if (startTime <= currentTimeStamp && startDate.isSame(currentDate)) {
    errors.StartTime =
      'Start Time can not be less than or equal to current time';
  }

  if (!values.EndTime) {
    errors.EndTime = 'Please select a End Time.';
  } else if (endTime <= startTimeOnly) {
    errors.EndTime = 'End Time can not be less than or equal to Start time';
  }

  return errors;
};

class AddClassForm extends React.Component {
  props: AddClassFormProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  onSubmit = formData => {
    /** Frequency set to Weekly */
    formData.FrequencyTypeId = 'c50a57d8-2146-4a55-87f3-52f71a845ab9';
    formData.MaximumStudents = parseInt(formData.MaximumStudents);
    formData.SchoolId = this.props.schoolId;

    let startUtcDateAndTime = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.StartTime).format('HH:mm:ss')
    );
    formData.StartTimeUtc = startUtcDateAndTime.format('HH:mm:ss');

    let endDate = '9999-12-31T00:00:00';
    if (formData.EndDate) endDate = formData.EndDate;

    let endUtcDateAndTime = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.EndTime).format('HH:mm:ss')
    );

    formData.EndTimeUtc = endUtcDateAndTime.format('HH:mm:ss');
    formData.EndDate = endDate;

    let newFormData = {
      ...formData,
      EndDate: formData.EndDate,
      EndTimeUtc: formData.EndTimeUtc,
    };

    log('onSubmit formData', newFormData);
    this.props.dispatchFormPost(newFormData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField
            label="Class Name*"
            name="Name"
            id="School.Classes.AddNewClass.Name"
            required={true}
            help={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="Description"
            name="Description"
            id="School.Classes.AddNewClass.Description"
            required={true}
            textarea={true}
            help={true}
          />
        </InputBlock>
        <InputBlock>
          <StaffSelectField
            label="Instructor*"
            name="Instructor"
            id="School.Classes.AddNewClass.Instructor"
            required={true}
            help={true}
          />
        </InputBlock>

        <InputBlock>
          <ProgramSelectField
            label="Program*"
            name="SchoolStyleId"
            id="School.Classes.AddNewClass.Program"
            required={true}
            help={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Max Students*"
            name="MaximumStudents"
            id="School.Classes.AddNewClass.MaxStudents"
            type="number"
            input={{ min: 0 }}
            required={true}
            help={true}
          />
        </InputBlock>

        <hr />
        <h3>Class Schedule</h3>

        <InputBlock>
          <DateField
            future
            label="Start Date*"
            name="StartDate"
            id="School.Classes.AddNewClass.StartDate"
            help={true}
          />
          <DateField
            future
            label="End Date"
            name="EndDate"
            id="School.Classes.AddNewClass.EndDate"
            help={true}
          />
        </InputBlock>
        <InputBlock>
          <TimeField
            label="Time Start*"
            id="School.Classes.AddNewClass.StartTimeUtc"
            name="StartTime"
            help={true}
            required={true}
          />
          <TimeField
            label="Time End*"
            id="School.Classes.AddNewClass.EndTimeUtc"
            name="EndTime"
            help={true}
            required={true}
          />
        </InputBlock>

        <hr />
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
}

const ConnectedAddClassForm = connect(
  AddClassForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-class', // a unique identifier for this form
  validate,
})(ConnectedAddClassForm);
